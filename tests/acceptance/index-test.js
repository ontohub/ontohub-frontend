import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | index', () => {
  let application;

  beforeEach(() => {
    application = startApp();
    visit('/');
  });

  afterEach(() => {
    destroyApp(application);
  });

  it('can visit /', () => {
    expect(currentURL()).to.equal('/');
  });

  it('shows the welcome message', () => {
    const header = find('.top-route-header'),
          heading = find('h1', header),
          subheading = find('p.help-text', header);

    expect(heading.text()).to.equal('Welcome to Ontohub!');
    // eslint-disable-next-line max-len
    expect(subheading.text()).to.equal('Repositories and proof tools for Ontologies, Models and Specifications (OMS)');
  });

  it('shows the development note', () => {
    const warning = find('.page-content .warning.callout'),
          heading = find('h4', warning);

    expect(heading.text()).to.equal('Please note:');
  });
});
