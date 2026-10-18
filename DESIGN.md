# Rudolf Studio — arquitetura vigente

A referência visual fornecida pelo usuário define três telas: escolha de categoria → lista de cases da categoria → case com carrossel e miniaturas. Ela substitui as abordagens anteriores de parede de imagens e home com slides. Fundo branco, tipografia preta/cinza, SVG oficial transparente, navegação flutuante com menu recolhido.

## Rotas

- `/`: loading destacado com a logo e seletor de seis categorias.
- `/projetos`: mesmo seletor, sem repetir o loading.
- `/projetos/categorias/[category]`: lista vertical de cases, capa grande e nome.
- `/projetos/[slug]?categoria=...`: caminho categoria/case, carrossel, contexto e entregas.
- `/sobre`: apresentação de Pablo. Contato no menu.

## Categorias e curadoria

O usuário confirmou incluir as seis categorias do desenho: Design de posts; Identidade visual; Sites e landing pages; Impressos; Thumbs e banners; Outros. Sites e landing pages inclui o case real de Articula Life. Arte digital permanece excluída. Impressos e banners usam projetos reais com essas aplicações; um case pode aparecer em mais de uma categoria. Outros reúne colaborações e estudos. Não criar projetos vazios ou fictícios para completar categorias.

`portfolio-categories.ts` mantém associação e ordem; `projects.ts` mantém as capas escolhidas manualmente, com Behance primeiro. `project-details.ts` descreve conteúdo e entregas sem métricas ou resultados inventados.

## Loading

SVG grande centralizado em fundo branco, progresso de fontes/primeiras imagens e saída de cortina. Pular/Escape. Reaparece em carregamento completo, sem repetir nos retornos pelo roteador. Movimento reduzido pula a espera.

## Navegação e animações

Barba.js 2.10.3 executa o ciclo real `Transitions.doPage`, leave, enter e after entre home, categorias e cases. O adaptador retém o gerenciador público, desliga os listeners PJAX e restaura exatamente o histórico do Next. `add` espera o commit do App Router; `remove` delega o desmonte ao React. O Next mantém rotas, hidratação e histórico. Cortina com SVG e Web Animations API; respeitar movimento reduzido.

## Carrossel

Imagem inteira com contain, setas, contador e miniaturas; sem autoplay. Teclado esquerda/direita com foco no carrossel. Miniatura ativa anunciada e visível na faixa. Contexto e entregas ficam abaixo. Categoria de origem é mantida pelo parâmetro `categoria`, validado contra as categorias do projeto.


Página Sobre: retrato real fornecido pelo usuário em `public/profile/pablo-rudolf.png`, usado sem alterações. Foto ao lado da apresentação no desktop e acima no celular. Dados pessoais permanecem os já usados no portfólio.
