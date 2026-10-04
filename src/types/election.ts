export type Office='1'|'3'|'5'|'6'|'7'|'8';
export interface Candidate {id:string;name:string;fullName:string;number:string;party:string;votes:number|null;percent:number|null;status:string;photo:string;office:Office;uf:string;destination:string}
export interface Statistics {sections:number|null;totalSections:number|null;progress:number|null;electorate:number|null;attendance:number|null;abstentions:number|null;valid:number|null;blank:number|null;null:number|null;attendancePercent:number|null;abstentionPercent:number|null;blankPercent:number|null;nullPercent:number|null}
export interface Result {uf:string;city:string|null;office:Office;source:string;updatedAt:string;generatedAt:string;fetchedAt:string;stale:boolean;finished:boolean;candidates:Candidate[];stats:Statistics;generation:string;disclosed:boolean}
export interface City {code:string;slug:string;name:string;uf:string;capital:boolean;electorate?:number|null;progress?:number|null}
export interface State {uf:string;name:string;region:string}
export interface StateSummary extends State {progress:number|null;leader:Candidate|null;error?:boolean;updatedAt?:string}
export const offices:{id:Office;name:string;short:string}[]=[{id:'1',name:'Presidente',short:'Presidente'},{id:'3',name:'Governador',short:'Governador'},{id:'5',name:'Senador',short:'Senador'},{id:'6',name:'Deputado Federal',short:'Dep. Federal'},{id:'7',name:'Deputado Estadual',short:'Dep. Estadual'},{id:'8',name:'Deputado Distrital',short:'Dep. Distrital'}];
