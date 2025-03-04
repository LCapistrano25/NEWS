document.addEventListener("DOMContentLoaded", () => {
    // Função para pegar a data atual
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Função para formatar a data
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Pegar a data e idioma selecionados
    async function fetchNews() {
        const apiKey = '12b654c1f2a44e7fb741cf38c5ae3f7a'; // Substitua pela sua chave da NewsAPI
        const searchTerm = document.getElementById('search').value || 'Star Wars';
        const selectedDate = document.getElementById('date').value || '2025-02-20';
        const selectedLanguage = document.getElementById('language').value || 'pt';
        const url = `https://newsapi.org/v2/everything?q=${searchTerm}&from=${selectedDate}&sortBy=publishedAt&language=${selectedLanguage}&pageSize=10&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const newsContainer = document.getElementById('news-container');
            
            // Limpa o conteúdo existente
            newsContainer.innerHTML = '';

            // Verifica se há artigos
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-md');
                    newsItem.innerHTML = `
                        <h2 class="text-xl font-semibold">${article.title}</h2>
                        <p class="text-gray-600 mt-2">${article.description}</p>
                        <p class="text-gray-500 text-sm mt-2">Publicado em: ${formatDate(article.publishedAt)}</p>
                        <a href="${article.url}" target="_blank" class="text-blue-500 hover:underline mt-3 inline-block">Leia mais</a>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p class="text-gray-500">Nenhuma notícia encontrada para hoje.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar as notícias:', error);
        }
    }

    // Chama a função para buscar notícias ao carregar a página
    fetchNews();

    // Adiciona evento para buscar notícias quando a data ou idioma mudar
    document.getElementById('date').addEventListener('change', fetchNews);
    document.getElementById('language').addEventListener('change', fetchNews);
    document.getElementById('search').addEventListener('input', fetchNews);
});
