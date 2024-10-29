<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="container mx-auto">
	<h2
		class="scroll-m-20 border-b pb-4 text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		What can you do with this application?
	</h2>
	<Accordion.Root class="mx-auto w-full py-8 sm:max-w-[70%]">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>What is a feature flag?</Accordion.Trigger>
			<Accordion.Content>
				A feature flag is a toggle that allows you to enable or disable a specific feature in your
				application without requiring a code deployment.</Accordion.Content
			>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>Where is my data Storage?</Accordion.Trigger>
			<Accordion.Content
				>FlagShip is built on top of Workers platform. It uses D1 for storing relational data.
				Feature flags are synced to suported destinations (workers KV is supported for now).</Accordion.Content
			>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>what does it cost?</Accordion.Trigger>
			<Accordion.Content
				>FlagShip is a self-hosted solution that runs on your Cloudflare account, with no additional costs beyond your existing Cloudflare Workers usage. You can use it for free, within the limits of your Cloudflare Workers free tier.</Accordion.Content
			>
		</Accordion.Item>
	</Accordion.Root>
</div>
