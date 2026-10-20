<script>
    import SEO from '$lib/SEO.svelte';
    import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
    import SortAscending from 'phosphor-svelte/lib/SortAscending';
    import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
    import Select from '$lib/ui/components/Select.svelte';
    import FilterSortBar from '$lib/ui/components/FilterSortBar.svelte';

    let { data } = $props();

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    // The CMS uses the non-standard codes UK and TP; Intl expects GB and TL
    const codeFix = { UK: 'GB', TP: 'TL', AN: 'CW' };

    const countryName = (code) => {
        if (!code) return '';
        try {
            return regionNames.of(codeFix[code] ?? code) ?? code;
        } catch {
            return code;
        }
    };

    const partners = $derived(
        (data.partners?.docs ?? []).map((p) => ({ ...p, countryName: countryName(p.country) }))
    );

    const countries = $derived(
        [...new Map(partners.filter((p) => p.country).map((p) => [p.country, p.countryName]))]
            .sort((a, b) => a[1].localeCompare(b[1]))
    );

    let search = $state('');
    let country = $state('all');
    let sortKey = $state('name');
    let sortDir = $state('asc');

    const isDefault = $derived(
        search === '' && country === 'all' && sortKey === 'name' && sortDir === 'asc'
    );

    function resetFilters() {
        search = '';
        country = 'all';
        sortKey = 'name';
        sortDir = 'asc';
    }

    const rows = $derived.by(() => {
        const q = search.trim().toLowerCase();
        const dir = sortDir === 'asc' ? 1 : -1;
        return partners
            .filter((p) => country === 'all' || p.country === country)
            .filter(
                (p) =>
                    !q ||
                    [p.name, p.countryName, p.country, p.website].some((v) => v?.toLowerCase().includes(q))
            )
            .toSorted((a, b) => dir * (a[sortKey] ?? '').localeCompare(b[sortKey] ?? ''));
    });

    function toggleSort(key) {
        if (sortKey === key) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey = key;
            sortDir = 'asc';
        }
    }

    const ariaSort = (key) =>
        sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none';

    const hostname = (url) => {
        try {
            return new URL(url).hostname.replace(/^www\./, '');
        } catch {
            return url;
        }
    };

    const sortItems = [
        { value: 'name:asc', label: 'Name A-Z' },
        { value: 'name:desc', label: 'Name Z-A' },
        { value: 'countryName:asc', label: 'Country A-Z' },
        { value: 'countryName:desc', label: 'Country Z-A' }
    ];

    const sortValue = $derived(`${sortKey}:${sortDir}`);

    function onSortChange(v) {
        [sortKey, sortDir] = v.split(':');
    }

    const countryItems = $derived([
        { value: 'all', label: 'All Countries' },
        ...countries.map(([code, name]) => ({ value: code, label: name }))
    ]);
</script>

<SEO
    title={data.seoSettings?.meta?.title || 'Our Partners'}
    description={data.seoSettings?.meta?.description || 'Organisations we work with'}
    collection={data.seoSettings?.label || 'Partners'}
/>

<div class="flex w-full flex-col items-center overflow-x-hidden">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Our Partners</h1>
    <p class="text-foreground mb-8 text-2xl">Organisations we work with</p>

    <FilterSortBar 
        count={rows.length}
        countLabel="partner"
        onReset={resetFilters}
        resetDisabled={isDefault}
    >
        {#snippet filters()}
            <div class="flex items-center gap-2">
                <FunnelSimple class="text-primary size-5" weight="bold" />
                <span class="text-muted-foreground text-sm font-medium">Filter:</span>
            </div>

            <div class="relative w-full sm:w-[220px]">
                <MagnifyingGlass
                    class="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2"
                />
                <input
                    type="search"
                    bind:value={search}
                    placeholder="Search partners…"
                    aria-label="Search partners"
                    class="border-border bg-background text-foreground h-8 w-full rounded border pr-2 pl-8 text-sm"
                />
            </div>

            <Select
                bind:value={country}
                items={countryItems}
                placeholder="All Countries"
                classTrigger="w-full sm:w-[200px]"
                classContent="w-[200px]"
                id="country"
                type="single"
            />
        {/snippet}

        {#snippet sort()}
            <div class="flex items-center gap-2">
                <SortAscending class="text-primary size-5" weight="bold" />
                <span class="text-muted-foreground text-sm font-medium">Sort:</span>
            </div>

            <Select
                value={sortValue}
                onValueChange={onSortChange}
                items={sortItems}
                placeholder="Select order"
                classTrigger="w-full sm:w-[180px]"
                classContent="w-[180px]"
                id="sort-order"
                type="single"
            />
        {/snippet}
    </FilterSortBar>

    <div class="w-full max-w-screen-xl px-4 pb-12 lg:px-2">
        <div class="border-border overflow-x-auto rounded-md border">
            <table class="w-full text-left">
                <thead class="bg-muted text-foreground">
                    <tr>
                        {#each [['name', 'Name'], ['countryName', 'Country']] as [key, label] (key)}
                            <th scope="col" aria-sort={ariaSort(key)} class="px-4 py-3">
                                <button
                                    type="button"
                                    onclick={() => toggleSort(key)}
                                    class="inline-flex items-center gap-1 font-bold tracking-tight hover:underline"
                                >
                                    {label}
                                    <span aria-hidden="true" class="text-muted-foreground">
                                        {sortKey === key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                                    </span>
                                </button>
                            </th>
                        {/each}
                        <th scope="col" class="px-4 py-3 font-bold tracking-tight">Website</th>
                    </tr>
                </thead>
                <tbody>
                    {#each rows as p (p.id ?? p.slug)}
                        <tr class="border-border hover:bg-muted/50 border-t">
                            <td class="text-foreground px-4 py-3 font-medium">{p.name}</td>
                            <td class="text-muted-foreground px-4 py-3">{p.countryName || '—'}</td>
                            <td class="px-4 py-3">
                                {#if p.website}
                                    <a
                                        href={p.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary hover:underline"
                                    >
                                        {hostname(p.website)}
                                    </a>
                                {:else}
                                    <span class="text-muted-foreground">—</span>
                                {/if}
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="3" class="text-muted-foreground px-4 py-8 text-center">
                                No partners match your search.
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>