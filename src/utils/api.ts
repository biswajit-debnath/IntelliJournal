const createUrl = (path: string) => {
    return window.location.origin + path;
}

export const updateEntry = async (journalId, content) => {
    const res = await fetch( 
        new Request(createUrl(`/api/journal/${journalId}`), {
            method: 'PATCH',
            body: JSON.stringify({ content })
    }));

    if(res.ok) {
        const resData = await res.json()
        return resData.data;
    }
}

export const createNewEntry = async () => {
    const res = await fetch(new Request(createUrl('/api/journal'), {
        method: 'POST'
    }))

    if(res.ok) {
        const resData = await res.json()
        return resData.data;
    }
}