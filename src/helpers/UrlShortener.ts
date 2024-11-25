class UrlShortener {
  private urlDatabase: Map<string, string> = new Map();
  public baseUrl: string = `${window.origin}/formulario-pre-consulta-preencher/`;

  // Método para encurtar a URL
  shorten(longUrl: string): string {
    const shortId = this.generateShortId();
    this.urlDatabase.set(shortId, longUrl);
    return `${this.baseUrl}${shortId}`;
  }

  // Método para gerar um ID curto - para simplificar, usaremos números aleatórios
  private generateShortId(): string {
    return Math.random().toString(36).substr(10);
  }

  // Método para obter a URL longa original
  expand(shortId: string): string | undefined {
    return this.urlDatabase.get(shortId);
  }
}

export default UrlShortener;
