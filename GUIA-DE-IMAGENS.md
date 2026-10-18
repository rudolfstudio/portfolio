# Guia de imagens — Portfólio de Pablo Rudolf

Esta versão é uma cópia local do original. Não altera o repositório do Matheus ou o site publicado. Loading, logo, menu e transições foram preservados. Fotos e artes foram desligadas no cadastro: src vazio mostra cinza. Não há busca automática de imagens ao navegar: o site usa o cadastro local projects.json. Os links de Instagram e Behance são referências, não devem determinar suas novas imagens.

## Arquivos para preparar (largura × altura)

| Uso | Exportação exata | Proporção |
| --- | --- | --- |
| Capa de projeto em Design de posts | 2000 × 1000 px | 2:1 |
| Cada post do carrossel de Design de posts | 1080 × 1350 px | 4:5 |
| Capa de categoria na home | 2000 × 800 px | 5:2 |
| Retrato na página Sobre, se desejar adicionar | 1200 × 1200 px | 1:1 |

São dimensões dos arquivos a criar. A exibição é responsiva: a capa de projeto chega a 1000 × 500 pixels CSS ; o carrossel acompanha a proporção real da arte e se adapta à tela. Miniaturas são geradas com as mesmas imagens; não exporte miniaturas separadas. As imagens do carrossel usam contain: aparecem inteiras, sem corte. Use o formato original dos posts: 4:5 na maior parte dos casos e aproximadamente 3:4 nos posts mais altos. Não estique nem recorte. Para capas, mantenha detalhes importantes afastados das bordas. Prefira WebP de boa qualidade, ou PNG quando necessário; idealmente menos de 800 KB por imagem.

## Como adicionar imagens em um projeto

1. Abra public/media e crie uma pasta com o nome do projeto, por exemplo leviah.
2. Adicione capa.webp, 01.webp, 02.webp e assim por diante. Use nomes sem espaços ou acentos.
3. Abra src/data/projects.json e encontre o projeto pelo title ou slug. Preserve o slug para manter o endereço e a associação às categorias.
4. Preencha cover e images como abaixo. No endereço não entra public.

```json
"cover": { "src": "/media/leviah/capa.webp", "width": 2000, "height": 1000 },
"images": [
  { "src": "/media/leviah/01.webp", "width": 1080, "height": 1350 },
  { "src": "/media/leviah/02.webp", "width": 1080, "height": 1350 }
]
```

5. Para deixar um espaço cinza, use src: "". Há três slides cinza por projeto nesta versão; pode remover ou acrescentar itens. Um array vazio também mostra um slide cinza.
6. Edite o nome em title no arquivo src/data/projects.json: use somente a empresa ou o profissional. Edite resumo e entregáveis em src/lib/project-details.ts, procurando o mesmo slug. O resumo aparece abaixo da capa e dentro do projeto.
7. Confira a categoria em src/lib/portfolio-categories.ts. sourceCategory associa a categoria do cadastro; members permite atribuir slugs específicos. Retire de projects.json os projetos que decidir não apresentar; preserve os slugs mencionados em members ou atualize essa lista junto.
8. Rode pnpm build para conferir a versão antes de publicar.

## Capas de categoria e retrato

As seis capas da home são independentes das capas dos projetos. Envie arquivos de 2000 × 800 px para public/media/categorias e preencha o caminho correspondente em src/data/category-covers.json, por exemplo: "design-de-posts": "/media/categorias/posts.webp". Caminho vazio mantém o bloco cinza.

O retrato está substituído por um bloco cinza em src/app/sobre/page.tsx. Para restaurar uma foto própria, use Image com src do arquivo em public/profile e width/height correspondentes. A logo é a única imagem visual preservada para manter a identidade e o loading.

## Publicar no seu GitHub

Crie um repositório seu para esta cópia. O projeto já usa exportação estática, mas a publicação em GitHub Pages ainda precisa de configuração conforme o nome do seu repositório/domínio. Não publique a pasta .openai como configuração de uma nova hospedagem: ela identifica o site original. Antes de publicar, ajuste também o domínio em layout.tsx, sitemap.ts, robots.ts e na página de projeto. A integração de Pages será feita quando você indicar seu repositório de destino.



## Seleção de Design de posts

A categoria agora apresenta somente os 11 cases selecionados. Leviah e NanoGlow são separados. Sergio Caus está oculto por enquanto. As imagens locais estão em public/media/selected/<código-do-post>/slide-02.jpg em diante. O registro docs/instagram-image-sources.json documenta de qual post e slide cada arquivo veio. Nenhum slide 1 foi importado. As capas da categoria combinam três artes internas sem recortar as imagens. A home mantém seu cadastro independente e continua com capas cinza.

Seleção atual: Leviah, Viafor Clinic, Mais Odonto, Gabriela Pereira e Pousada da Praia. As cinco capas próprias estão em public/media/covers; o campo coverImages não é usado nesses cases. Pousada da Praia usa os sete slides internos baixados do Instagram, do slide 2 ao 8.

Seleção atualizada: seis cases — Leviah, Viafor Clinic, Mais Odonto, Gabriela Pereira, Pousada da Praia e NOMA Arquitetura. Capas próprias em 2000 × 1000 px.

Seleção final de Design de posts, na ordem dos arquivos numerados:
1. Leviah
2. Appel Store
3. NOMA Arquitetura
4. Mais Odonto
5. Viafor Clinic
6. Pousada da Praia
7. Matheus Pereira
8. Gabriela Pereira
9. Nano Glow
10. OCZY
