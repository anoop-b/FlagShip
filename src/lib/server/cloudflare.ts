class Cloudflare {
	private accountId: string;
	private namespaceId: string;
	private apiKey: string;

	constructor(accountId: string, namespaceId: string, apiKey: string) {
		this.accountId = accountId;
		this.namespaceId = namespaceId;
		this.apiKey = apiKey;
	}

	async putValue(keyName: string, body:any): Promise<Response> {
		const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${keyName}`;
		const headers = {
			Authorization: `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json'
		};

		try {
			const response = await fetch(url, { headers, method: 'PUT', body: body });
			return response;
		} catch (error) {
			throw new Error(`Failed to get KV value: ${error}`);
		}
	}
	async getNS(): Promise<Response> {
		const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}`;
		const headers = {
			Authorization: `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json'
		};

		try {
			const response = await fetch(url, { headers });
			return response;
		} catch (error) {
			throw new Error(`Failed to get KV value: ${error}`);
		}
	}
	async getValue(keyName: string): Promise<Response> {
		const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${keyName}`;
		const headers = {
			Authorization: `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json'
		};

		try {
			const response = await fetch(url, { headers });
			return response;
		} catch (error) {
			throw new Error(`Failed to get KV value: ${error}`);
		}
	}
}

export default Cloudflare;
