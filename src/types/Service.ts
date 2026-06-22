// Representação do DTO que vem do Java
export interface ServiceResponseDTO {
    id: string;
    title: string;
    description: string;
    price: number;
// Tipo União: O TS avisará se a API mandar uma moeda diferente dessas duas.
    currency: 'BRL' | 'PYG'; 
    category: string;
    providerName: string;
}