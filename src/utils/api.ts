const createUrl = (path: string) => {
    return window.location.origin + path;
}

export const updateEntry = async (journalId: string, content: string) => {
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

export const askQuestion = async (question: string) => {
    const res = await fetch(new Request(createUrl('/api/question'), {
        method: 'POST',
        body: JSON.stringify({question})
    }));

    if(res.ok) {
        const resData = await res.json();
        return resData.data;
    }
}