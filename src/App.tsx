import { useEffect, useState } from 'react';
import { ServiceResponseDTO } from './types/Service';
export default function App() {
/**
     * HOOKS: Gerenciadores de Estado no React
     * 'services' guarda o array de serviços vindo do backend.
     * 'loading' gerencia a tela de "Carregando...".
     */
const [services, setServices] = useState<ServiceResponseDTO[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const API_URL = import.meta.env.VITE_API_URL;
/**
     * useEffect com array vazio [] executa a busca APENAS UMA VEZ
     * quando o componente é montado na tela.
     */
    useEffect(() => {
const fetchServices = async () => {
try {
const response = await fetch(`${API_URL}/services`);
if (!response.ok) {
throw new Error('Falha ao comunicar com a API FronteirApp');
                }
const data = await response.json();
                setServices(data);
            } 
catch (error) {
                console.error("Erro:", error);
            } 
            }
        };
finally {
                setLoading(false);
        fetchServices();
    }, []);
/**
     * FUNÇÃO CORE: Contexto Binacional. 
     * Formata os valores monetários dependendo da moeda.
     */
const formatCurrency = (price: number, currency: 'BRL' | 'PYG') => {
if (currency === 'PYG') {
// Guarani Paraguaio: Sem casas decimais padrão.
return `₲ ${price.toLocaleString('es-PY')}`;
        }
Página 17 de 10
// Real Brasileiro: Obriga mostrar centavos.
return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    };
if (loading) {
return <div style={{ padding: '20px' }}><h2>Carregando serviços da fronteira...</
h2></div>;
    }
// Renderização do JSX (Mistura de HTML com Lógica TS)
return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 
'sans-serif' }}>
            <header style={{ borderBottom: '2px solid #0ea5e9', paddingBottom: '10px', 
marginBottom: '20px' }}>
                <h1 style={{ color: '#0f172a', margin: 0 }}>FronteirApp - Serviços 
Locais</h1>
                <p style={{ color: '#64748b', margin: '5px 0' }}>Conectando Ponta Porã e 
Pedro Juan Caballero</p>
            </header>
            <div style={{ display: 'grid', gap: '15px' }}>
                {services.length === 0 ? (
                    <p>Nenhum serviço encontrado no momento.</p>
                ) : (
                    services.map(service => (
                        <article key={service.id} style={{ border: '1px solid #cbd5e1', 
borderRadius: '8px', padding: '15px' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0369a1' }}
>{service.title}</h3>
                            <p style={{ margin: '0 0 15px 0' }}>{service.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space
between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px', 
borderRadius: '4px' }}>
                                <strong style={{ fontSize: '1.2em', color: '#16a34a' }}>
                                    {formatCurrency(service.price, service.currency)}
                                </strong>
                                <span style={{ fontSize: '0.9em', color: '#64748b', 
backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '12px' }}>
                                    {service.category}
                                </span>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}