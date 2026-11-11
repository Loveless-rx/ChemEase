/** Stable object-key order for snapshot equality; array order remains significant. */
export const canonicalJson=(input:unknown)=>JSON.stringify(input,(_key,value:unknown)=>
  value&&typeof value==="object"&&!Array.isArray(value)
    ?Object.fromEntries(Object.entries(value).sort(([a],[b])=>a.localeCompare(b)))
    :value,
);
