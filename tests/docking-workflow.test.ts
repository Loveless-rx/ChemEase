import test from 'node:test';
import assert from 'node:assert/strict';
import { dockingReadiness, type SearchFields } from '../src/features/docking/workflow';
import type { Asset, Grid, Health } from '../src/features/docking/types';

const asset=(kind:string):Asset=>({id:kind,name:kind,kind,createdAt:'2026-11-25',ready:true,files:{features:{name:'features.json',bytes:10,sha256:'a'.repeat(64)}},tools:{protocol:'chemease-browser-v2'}});
const fields:SearchFields={exhaustiveness:'8',cpu:'2',poseCount:'9',seed:'42',ad4Runs:'10',ad4Evaluations:'2500000'};
const grid:Grid={center:{x:0,y:0,z:0},size:{x:20,y:20,z:20}};
const health:Health={service:'test',apiVersion:1,tools:{},engines:[{id:'vina',label:'Vina',available:true},{id:'autodock4',label:'AD4',available:true}]};
const setup=()=>({receptor:asset('receptor'),ligand:asset('ligand'),grid,health,engine:'vina' as const,browser:true,fields:{...fields},reviewed:true});

test('docking launch requires prepared topology, current browser protocol and a reviewed grid',()=>{
  assert.equal(dockingReadiness(setup()).canRun,true);
  for(const change of [
    {receptor:undefined},{ligand:undefined},{grid:undefined},{reviewed:false},
    {receptor:{...asset('receptor'),ready:false}},
    {ligand:{...asset('ligand'),files:{}}},
    {ligand:{...asset('ligand'),tools:{protocol:'legacy'}}},
  ]) assert.equal(dockingReadiness({...setup(),...change}).canRun,false);
  const missing=dockingReadiness({...setup(),receptor:undefined,ligand:undefined,grid:undefined,reviewed:false});
  assert.equal(missing.inputsReady,false);
  assert.equal(missing.siteReady,false);
  assert.equal(missing.missing.length,4);
});

test('docking search rejects unavailable engines and incomplete or out-of-range integer controls',()=>{
  assert.equal(dockingReadiness({...setup(),health:null}).canRun,false);
  assert.equal(dockingReadiness({...setup(),health:{...health,engines:[]}}).canRun,false);
  for(const [key,value] of [['cpu','0'],['cpu','5'],['poseCount','21'],['poseCount',''],['seed','1.5'],['exhaustiveness','33']]) {
    assert.equal(dockingReadiness({...setup(),fields:{...fields,[key]:value}}).canRun,false,`${key}=${value}`);
  }
});

test('native AD4 readiness uses AD4 controls rather than hidden Vina and browser-worker controls',()=>{
  const native={...setup(),browser:false,engine:'autodock4' as const,ligand:{...asset('ligand'),tools:{}},fields:{...fields,cpu:'',exhaustiveness:''}};
  assert.equal(dockingReadiness(native).canRun,true);
  assert.equal(dockingReadiness({...native,fields:{...native.fields,ad4Runs:'51'}}).canRun,false);
  assert.equal(dockingReadiness({...native,fields:{...native.fields,ad4Evaluations:'99999'}}).canRun,false);
});
