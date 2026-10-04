export const number=(n:number|null|undefined)=>n==null?'—':n.toLocaleString('pt-BR');
export const percent=(n:number|null|undefined)=>n==null?'—':n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const slug=(s:string)=>normalize(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const dateTime=(s?:string)=>s?new Date(s).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}):'Aguardando dados';
export const time=(s?:string)=>s?new Date(s).toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo'}):'—';
export const palette=['#e30613','#9e0b14','#f25c66','#7a1f2b','#c45c4a','#e8a0a6'];
