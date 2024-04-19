"use strict";

class API {
  async call({ method, path, body }) {
    const res = await fetch(`./api${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) {
      return;
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || res.statusText);
    }

    return json;
  }

  async getRelease() {
    const data = await this.call({
      method: "get",
      path: "/release",
    });
    return data.release;
  }

  async getLang() {
    const data = await this.call({
      method: "get",
      path: "/lang",
    });
    return data.lang;
  }

  async getuiTrafficStats() {
    const data = await this.call({
      method: "get",
      path: "/ui-traffic-stats",
    });
    return data.uiTrafficStats;
  }

  async getChartType() {
    const data = await this.call({
      method: "get",
      path: "/ui-chart-type",
    });
    return data.uiChartType;
  }

  async getSession() {
    return this.call({
      method: "get",
      path: "/session",
    });
  }

  async createSession({ password }) {
    return this.call({
      method: "post",
      path: "/session",
      body: { password },
    });
  }

  async deleteSession() {
    return this.call({
      method: "delete",
      path: "/session",
    });
  }

  async getClients() {
    return this.call({
      method: "get",
      path: "/wireguard/client",
    }).then((clients) =>
      clients.map((client) => ({
        ...client,
        createdAt: new Date(client.createdAt),
        updatedAt: new Date(client.updatedAt),
        latestHandshakeAt: client.latestHandshakeAt ? new Date(client.latestHandshakeAt) : null,
      })),
    );
  }

  async createClient({ name }) {
    return this.call({
      method: "post",
      path: "/wireguard/client",
      body: { name },
    });
  }

  async deleteClient({ clientId }) {
    return this.call({
      method: "delete",
      path: `/wireguard/client/${clientId}`,
    });
  }

  async enableClient({ clientId }) {
    return this.call({
      method: "post",
      path: `/wireguard/client/${clientId}/enable`,
    });
  }

  async disableClient({ clientId }) {
    return this.call({
      method: "post",
      path: `/wireguard/client/${clientId}/disable`,
    });
  }

  async updateClientName({ clientId, name }) {
    return this.call({
      method: "put",
      path: `/wireguard/client/${clientId}/name/`,
      body: { name },
    });
  }

  async updateClientAddress({ clientId, address }) {
    return this.call({
      method: "put",
      path: `/wireguard/client/${clientId}/address/`,
      body: { address },
    });
  }
}
