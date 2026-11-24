"""Research-only extension to pinned RDKit MinimalLib. No model activation."""
from pathlib import Path
import sys
root=Path(sys.argv[1]);path=root/"Code/MinimalLib/minilib.cpp"
s=path.read_text()
s="#include <GraphMol/RingInfo.h>\n#include <GraphMol/Descriptors/MolSurf.h>\n#include <GraphMol/PartialCharges/GasteigerCharges.h>\n#include <cmath>\n"+s
old="  return MinimalLib::get_descriptors(*d_mol);"
assert s.count(old)==1
new=r'''  rapidjson::Document doc;
  doc.Parse(MinimalLib::get_descriptors(*d_mol).c_str());
  auto &allocator=doc.GetAllocator();
  auto add=[&](const std::string &name,double value){
    rapidjson::Value key(name.c_str(),allocator),number;
    if(std::isfinite(value)) number.SetDouble(value); else number.SetNull();
    doc.AddMember(key,number,allocator);
  };
  auto series=[&](const std::string &prefix,const std::vector<double> &values){
    for(size_t i=0;i<values.size();++i)add(prefix+std::to_string(i+1),values[i]);
  };
  series("SlogP_VSA",Descriptors::calcSlogP_VSA(*d_mol));
  series("SMR_VSA",Descriptors::calcSMR_VSA(*d_mol));
  series("PEOE_VSA",Descriptors::calcPEOE_VSA(*d_mol));
  std::vector<double> charges(d_mol->getNumAtoms());
  computeGasteigerCharges(*d_mol,charges,12,false);
  double minimum=1e100,maximum=-1e100;
  for(double value:charges){minimum=std::min(minimum,value);maximum=std::max(maximum,value);}
  add("MinPartialCharge",minimum);add("MaxPartialCharge",maximum);
  add("MinAbsPartialCharge",std::min(std::abs(minimum),std::abs(maximum)));
  add("MaxAbsPartialCharge",std::max(std::abs(minimum),std::abs(maximum)));
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
