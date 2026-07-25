# DHR Digital — Site v1.0

Reconstrução do site institucional da DHR Digital, saindo do WordPress
(versão 4.9.1, desatualizada) para HTML/CSS/JS puro — sem build, sem
dependências, fácil de manter e hospedar de graça.

Escopo desta v1.0: **atualizar o site com o conteúdo e a identidade visual
atuais**, mantendo a mesma estrutura de páginas do site antigo. A etapa 2
(reformular a home com foco em produto) fica para depois.

## Estrutura do projeto

```
/
├── index.html              → Home
├── quem-somos.html
├── servicos.html
├── gopro.html
├── drones.html              → antiga "360º & Drone", generalizada
├── coleta-entrega.html      → antiga "Leva e Traz"
├── como-enviar.html
├── localizacao.html
├── contato.html
├── partials/
│   ├── header.html          → menu e topo, incluído via JS em toda página
│   └── footer.html          → rodapé, incluído via JS em toda página
├── assets/
│   ├── css/style.css        → design system completo (cores, tipografia, componentes)
│   ├── js/main.js           → inclui header/footer, menu mobile, ano dinâmico
│   └── img/logo-dhr.png     → novo logo
├── robots.txt
├── sitemap.xml
└── CNAME                    → domínio customizado (dhrdigital.com.br) para GitHub Pages
```

## Identidade visual

Paleta e tipografia derivadas do novo logo (fundo escuro, circuito azul, dourado do "Since 2009"):

- **Fundo:** `#0B111A` / painéis `#131B29`
- **Azul (ação/links):** `#5B9FE0`
- **Dourado (destaque/CTA):** `#C9A15C`
- **Texto:** `#EAEEF5` (principal) / `#93A1B8` (secundário)
- **Tipografia:** Space Grotesk (títulos) + Inter (texto) + IBM Plex Mono (dados técnicos, telefones, endereços)

O elemento de assinatura é a **"trilha de circuito"** nas laterais das seções
internas — remete ao ícone do logo (globo em circuito) e ao próprio ofício da
empresa: rastrear uma falha até a origem para consertá-la.

## Como rodar localmente

Os `partials` (header/footer) são incluídos via `fetch()`, o que exige um
servidor local (não funciona abrindo o arquivo `.html` direto no navegador,
por causa de CORS). Duas opções simples:

```bash
# Python (já vem instalado na maioria dos sistemas)
python3 -m http.server 8000

# ou, com Node instalado
npx serve .
```

Depois acesse `http://localhost:8000`.

## Deploy

O jeito mais simples e gratuito é **GitHub Pages**:

1. Suba este projeto para um repositório no GitHub (veja comandos abaixo)
2. Em **Settings → Pages**, selecione a branch `main` e a pasta raiz (`/`)
3. Em **Settings → Pages → Custom domain**, informe `dhrdigital.com.br`
   (o arquivo `CNAME` já está pronto para isso)
4. No provedor de DNS do domínio, aponte o registro para o GitHub Pages
   (A records para os IPs do GitHub Pages, ou CNAME se for subdomínio)

Alternativa igualmente simples: **Vercel** ou **Netlify** (arraste a pasta
ou conecte o repositório — nenhuma configuração de build é necessária).

### Comandos para subir ao GitHub

```bash
cd dhr-digital
git init
git add .
git commit -m "v1.0 — reconstrução do site institucional"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/dhr-digital.git
git push -u origin main
```

## Pendências para você decidir antes de publicar

1. **Formulário de contato**: usei o serviço gratuito [FormSubmit](https://formsubmit.co)
   para o formulário da página de Contato funcionar sem precisar de backend
   (ele envia direto para `contato@dhrdigital.com.br`). Na primeira submissão,
   o FormSubmit manda um e-mail de confirmação de ativação — é só confirmar uma vez.
   Se preferir outro serviço (ex: Formspree, ou um backend próprio), é só trocar
   a `action` do formulário em `contato.html`.
2. **Imagens reais**: não usei as fotos/fotos de produto do site antigo (eram
   arquivos binários que não consegui reaproveitar diretamente) — o visual atual
   usa ilustração vetorial baseada no novo logo. Se você tiver fotos da loja,
   do laboratório ou de equipamentos consertados, me manda que eu incorporo.
3. **Mapa**: o embed do Google Maps na página de Localização usa busca por
   endereço (sem chave de API). Se quiser um pino mais preciso, me passe o link
   do Google Maps do endereço exato que eu troco pelo embed correto.
4. **Vídeo institucional**: o site antigo tinha um vídeo do YouTube na home
   — não recoloquei até você confirmar se ainda representa a empresa.

## O que já foi resolvido nesta v1.0

- [x] Copyright dinâmico (`© 2009–{ano atual}`, atualiza sozinho todo ano)
- [x] Bug de encoding na página de Localização corrigido
- [x] Página "360º & Drone" generalizada para "Drones" (sem menção ao GoPro Karma, descontinuado)
- [x] Meta description otimizada, com menção à coleta e entrega gratuita em até 20km
- [x] WhatsApp com número correto (11) 96613-5425
- [x] Todo o conteúdo do site antigo migrado e revisado
- [x] Site responsivo (mobile, tablet, desktop)
- [x] Sem dependência de WordPress ou de qualquer build tool
