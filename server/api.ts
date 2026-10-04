import { result, locations, stateSummary, cities, states, candidateIndex } from './tse';

export async function handleApi(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  try {
    let body: unknown;
    const root = '/api/elections/2026';
    const office = url.searchParams.get('office') || '1';
    if (path === root + '/president') body = await result();
    else if (path === root + '/states') body = await stateSummary();
    else if (path === root + '/locations') body = await locations();
    else if (/^\/api\/elections\/2026\/states\/[a-z]{2}\/candidates$/i.test(path)) {
      const uf = path.split('/')[5].toLowerCase();
      if (!states.some((s) => s.uf === uf)) return Response.json({ message: 'UF inválida' }, { status: 404 });
      body = await candidateIndex(uf);
    } else {
      const match = path.match(/^\/api\/elections\/2026\/states\/([a-z]{2})(?:\/cities(?:\/([^/]+))?)?$/i);
      if (!match || !states.some((s) => s.uf === match[1].toLowerCase())) return Response.json({ message: 'Localização não encontrada' }, { status: 404 });
      const uf = match[1].toLowerCase();
      body = match[2] ? await result(uf, decodeURIComponent(match[2]), office) : path.endsWith('/cities') ? await cities(uf, office) : await result(uf, null, office);
    }
    return Response.json(body, { headers: { 'Cache-Control': 'private, max-age=15', 'X-Data-Source': 'TSE' } });
  } catch (error) {
    return Response.json(
      { message: 'Não foi possível obter uma nova atualização do TSE. Tente novamente em instantes.', detail: (error as Error).message },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
