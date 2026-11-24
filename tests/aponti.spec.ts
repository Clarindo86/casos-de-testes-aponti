import { test, expect } from '@playwright/test';

test('CT01 - Acessar página pública da Aponti Academy', async ({ page }) => {

  // Acessa a página pública da Aponti Academy
  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Verifica o título da página
  await expect(page).toHaveTitle(/Aponti Academy/i);

  // Verifica a seção de cursos disponíveis
  const cursosDisponiveis = page.getByRole('heading', {
    name: /Cursos disponíveis|Available courses/i
  });

  await expect(cursosDisponiveis).toBeVisible();

});

test('CT02 - Verificar cabeçalho da Aponti Academy', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza a navegação principal
  const navegacao = page.getByRole('navigation', {
    name: 'Navegação no site'
  });

  // Verifica o item Página inicial
  await expect(
    navegacao.getByRole('menuitem', {
      name: 'Página inicial',
      exact: true
    })
  ).toBeVisible();

  // Verifica o Painel do Kopere
  await expect(
    navegacao.getByRole('menuitem', {
      name: 'Painel do Kopere',
      exact: true
    })
  ).toBeVisible();

  // Verifica o acesso à plataforma
  await expect(
    navegacao.getByRole('link', {
      name: 'Acessar',
      exact: true
    })
  ).toBeVisible();

});


test('CT03 - Verificar seletor de idioma', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o botão de seleção de idioma
  const seletorIdioma = page.getByRole('button', {
    name: /Idioma/
  });

  // Verifica se o seletor está visível
  await expect(seletorIdioma).toBeVisible();

});


test('CT04 - Verificar controles do banner rotativo', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o botão de banner anterior
  const botaoAnterior = page.getByRole('button', {
    name: 'Anterior'
  });

  // Localiza o botão de próximo banner
  const botaoProximo = page.getByRole('button', {
    name: 'Próximo'
  });

  // Verifica se os controles estão visíveis
  await expect(botaoAnterior).toBeVisible();
  await expect(botaoProximo).toBeVisible();

});


test('CT05 - Verificar campo de pesquisa de cursos', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o campo de pesquisa
  const campoPesquisa = page.getByRole('textbox', {
    name: 'Buscar cursos'
  });

  // Localiza o botão de pesquisa
  const botaoPesquisa = page.getByRole('button', {
    name: 'Buscar cursos'
  });

  // Verifica visibilidade e disponibilidade
  await expect(campoPesquisa).toBeVisible();
  await expect(campoPesquisa).toBeEnabled();

  await expect(botaoPesquisa).toBeVisible();
  await expect(botaoPesquisa).toBeEnabled();

});


test('CT06 - Pesquisar curso existente', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o campo de pesquisa
  const campoPesquisa = page.getByRole('textbox', {
    name: 'Buscar cursos'
  });

  // Pesquisa um curso conhecido
  await campoPesquisa.fill('Do Prompt à Solução');

  // Aciona a pesquisa
  await page.getByRole('button', {
    name: 'Buscar cursos'
  }).click();

  // Verifica se o curso aparece nos resultados
  await expect(page.locator('body')).toContainText(
    'Do Prompt à Solução'
  );

});


test('CT07 - Pesquisar curso inexistente', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o campo de pesquisa
  const campoPesquisa = page.getByRole('textbox', {
    name: 'Buscar cursos'
  });

  // Pesquisa um curso inexistente
  await campoPesquisa.fill('curso-inexistente-qa-987654');

  // Executa a pesquisa
  await page.getByRole('button', {
    name: 'Buscar cursos'
  }).click();

  // Verifica a mensagem de ausência de cursos
  await expect(page.locator('body')).toContainText(
    /Nenhum curso/i
  );

});

test('CT08 - Acessar todos os cursos', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o link Todos os cursos
  const linkTodosCursos = page.getByRole('link', {
    name: 'Todos os cursos',
    exact: true
  });

  // Verifica se o link está visível
  await expect(linkTodosCursos).toBeVisible();

  // Acessa o catálogo de cursos
  await linkTodosCursos.click();

  // Verifica o endereço da página
  await expect(page).toHaveURL(/\/course\/index\.php/);

});


test('CT09 - Verificar categorias de cursos', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/course/index.php', {
    waitUntil: 'domcontentloaded'
  });

  // Verifica a categoria Academy
  await expect(
    page.getByRole('link', {
      name: 'Academy',
      exact: true
    })
  ).toBeVisible();

  // Verifica a categoria Bolsa Futuro Digital
  await expect(
    page.getByRole('link', {
      name: 'Bolsa Futuro Digital',
      exact: true
    })
  ).toBeVisible();

  // Verifica Formação Acelerada em Programação
  await expect(
    page.getByRole('link', {
      name: 'Formação Acelerada em Programação',
      exact: true
    })
  ).toBeVisible();

});


test('CT10 - Expandir pergunta frequente', async ({ page }) => {

 await page.goto('https://moodle.aponti.org.br/', {
  waitUntil: 'load',
  timeout: 60000
});
  // Localiza a pergunta frequente
  const pergunta = page.getByRole('button', {
    name: 'Como desativar as notificações do AVA',
    exact: true
  });

  // Verifica se a pergunta está visível
  await expect(pergunta).toBeVisible();

  // Expande a pergunta
  await pergunta.click();

  // Verifica se a resposta foi apresentada
  await expect(
    page.getByRole('heading', {
      name: '1. Acesse o Moodle',
      exact: true
    })
  ).toBeVisible();

  // Verifica o conteúdo da resposta
  await expect(page.locator('body')).toContainText(
    'Abra o menu do seu perfil'
  );

});


test('CT11 - Verificar avisos do site', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Verifica o título da seção de avisos
  await expect(
    page.getByRole('heading', {
      name: 'Avisos do site',
      exact: true
    })
  ).toBeVisible();

  // Verifica a mensagem de ausência de avisos
  await expect(
    page.getByText(
      'Ainda não há nenhum tópico de discussão neste fórum',
      { exact: true }
    )
  ).toBeVisible();

});


test('CT12 - Acessar tela de autenticação', async ({ page }) => {

  await page.goto('https://moodle.aponti.org.br/', {
    waitUntil: 'domcontentloaded'
  });

  // Localiza o link de acesso
  const linkAcessar = page.getByRole('link', {
    name: 'Acessar',
    exact: true
  }).first();

  // Verifica se o link está visível
  await expect(linkAcessar).toBeVisible();

  // Acessa a tela de autenticação
  await linkAcessar.click();

  // Verifica o endereço da página de login
  await expect(page).toHaveURL(/\/login\/index\.php/);

});


