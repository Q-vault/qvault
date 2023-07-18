interface University {
    id: string,
    name: string,
    location: string,
    departments: Department[]
}

interface Department {
    id: string,
    name: string,
    papers: Paper[]
}

interface Paper {
    id: string,
    name: string,
    years: Year[]
}

interface Year {
    id: string,
    year: number
}