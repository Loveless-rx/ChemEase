"""Research-only extension to pinned RDKit MinimalLib. No model activation."""
from pathlib import Path
import sys
root=Path(sys.argv[1]);path=root/"Code/MinimalLib/minilib.cpp"
s=path.read_text()
s="#include <string>\n#include <GraphMol/Fingerprints/MorganFingerprints.h>\n#include <GraphMol/ChemTransforms/ChemTransforms.h>\n#include <GraphMol/Descriptors/ConnectivityDescriptors.h>\n#include <GraphMol/Descriptors/Lipinski.h>\n#include <GraphMol/RingInfo.h>\n#include <GraphMol/Descriptors/MolSurf.h>\n#include <GraphMol/PartialCharges/GasteigerCharges.h>\n#include <cmath>\n"+s
old="  return MinimalLib::get_descriptors(*d_mol);"
assert s.count(old)==1
new=r'''  rapidjson::Document doc;
  doc.Parse(MinimalLib::get_descriptors(*d_mol).c_str());
  auto &allocator=doc.GetAllocator();
  auto add=[&](const std::string &name,double value){
    doc.RemoveMember(name.c_str());
    rapidjson::Value key(name.c_str(),allocator),number;
    if(std::isfinite(value)) number.SetDouble(value); else number.SetNull();
    doc.AddMember(key,number,allocator);
  };
  auto series=[&](const std::string &prefix,const std::vector<double> &values){
    for(size_t i=0;i<values.size();++i)add(prefix+std::to_string(i+1),values[i]);
  };
  add("Chi2n",Descriptors::calcChi2n(*d_mol));
  add("Chi2v",Descriptors::calcChi2v(*d_mol));
  series("SlogP_VSA",Descriptors::calcSlogP_VSA(*d_mol));
  series("SMR_VSA",Descriptors::calcSMR_VSA(*d_mol));
  series("PEOE_VSA",Descriptors::calcPEOE_VSA(*d_mol));
  add("NumAliphaticCarbocycles",Descriptors::calcNumAliphaticCarbocycles(*d_mol));
  add("NumAromaticCarbocycles",Descriptors::calcNumAromaticCarbocycles(*d_mol));
  add("NumSaturatedCarbocycles",Descriptors::calcNumSaturatedCarbocycles(*d_mol));
  unsigned int radicals=0;for(const auto atom:d_mol->atoms())radicals+=atom->getNumRadicalElectrons();
  add("NumRadicalElectrons",radicals);
  unsigned int heavy=0;for(const auto atom:d_mol->atoms())if(atom->getAtomicNum()>1)++heavy;
  for(unsigned int radius=1;radius<=3;++radius){
    std::unique_ptr<SparseIntVect<std::uint32_t>> fp(MorganFingerprints::getFingerprint(*d_mol,radius));
    add("FpDensityMorgan"+std::to_string(radius),heavy?double(fp->getNonzeroElements().size())/heavy:0);
  }
  std::unique_ptr<ROMol> aliphaticQuery(SmartsToMol("[$([A;R][!a])]"));
  std::unique_ptr<ROMol> aromaticRemainder(deleteSubstructs(*d_mol,*aliphaticQuery));
  add("hergQEDAROM",MolOps::findSSSR(*aromaticRemainder));
  std::vector<double> charges(d_mol->getNumAtoms());
  computeGasteigerCharges(*d_mol,charges,12,false);
  double minimum=1e100,maximum=-1e100;
  for(double value:charges){minimum=std::min(minimum,value);maximum=std::max(maximum,value);}
  add("MinPartialCharge",minimum);add("MaxPartialCharge",maximum);
  add("MinAbsPartialCharge",std::min(std::abs(minimum),std::abs(maximum)));
  add("MaxAbsPartialCharge",std::max(std::abs(minimum),std::abs(maximum)));
  std::vector<double> atomAreas(d_mol->getNumAtoms()); double hydrogenArea=0;
  Descriptors::getLabuteAtomContribs(*d_mol,atomAreas,hydrogenArea,true,false);
  rapidjson::Value surface(rapidjson::kArrayType);
  for(double area:atomAreas)surface.PushBack(area,allocator);
  doc.AddMember("hergAtomAreas",surface,allocator);
  rapidjson::Value atoms(rapidjson::kArrayType),bonds(rapidjson::kArrayType);
  for(const auto atom:d_mol->atoms()){
    rapidjson::Value row(rapidjson::kArrayType);
    row.PushBack(atom->getAtomicNum(),allocator);
    row.PushBack(atom->getTotalDegree(),allocator);
    row.PushBack(atom->getFormalCharge(),allocator);
    row.PushBack(static_cast<int>(atom->getChiralTag()),allocator);
    row.PushBack(atom->getTotalNumHs(),allocator);
    row.PushBack(static_cast<int>(atom->getHybridization()),allocator);
    row.PushBack(atom->getIsAromatic(),allocator);
    row.PushBack(atom->getMass(),allocator);
    atoms.PushBack(row,allocator);
  }
  for(const auto bond:d_mol->bonds()){
    rapidjson::Value row(rapidjson::kArrayType);
    row.PushBack(bond->getBeginAtomIdx(),allocator);row.PushBack(bond->getEndAtomIdx(),allocator);
    row.PushBack(bond->getBondTypeAsDouble(),allocator);
    row.PushBack(bond->getIsConjugated(),allocator);
    row.PushBack(d_mol->getRingInfo()->numBondRings(bond->getIdx())>0,allocator);
    row.PushBack(static_cast<int>(bond->getStereo()),allocator);
    bonds.PushBack(row,allocator);
  }
  doc.AddMember("hergAtomInputs",atoms,allocator);doc.AddMember("hergBondInputs",bonds,allocator);
  rapidjson::StringBuffer buffer;rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
  doc.Accept(writer);return buffer.GetString();'''
s=s.replace(old,new);path.write_text(s)

# Historical MinimalLib truncates descriptor JSON to five decimals. Model features
# require full double precision before normalization, so patch only this writer.
common=root/"Code/MinimalLib/common.h"
c=common.read_text();start=c.index("std::string get_descriptors(");end=c.index("namespace {",start)
section=c[start:end];assert section.count("writer.SetMaxDecimalPlaces(5);")==1
c=c[:start]+section.replace("writer.SetMaxDecimalPlaces(5);","writer.SetMaxDecimalPlaces(17);")+c[end:]
common.write_text(c)
