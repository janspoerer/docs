import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-wrap-cell-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}" theme="wrap-cell-content">
        <vaadin-grid-column
          header="Image"
          .renderer="${this.avatarRenderer}"
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column
          header="Address"
          .renderer="${this.addressRenderer}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private avatarRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    render(
      html`
        <img
          style="height: var(--lumo-size-m)"
          src="${(model.item as Person).pictureUrl}"
          alt="User avatar"
        />
      `,
      root
    );
  };

  private addressRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const item = model.item as Person;
    render(
      html`
        <span
          >${item.address.street} ${item.address.city} ${item.address.zip}
          ${item.address.state}</span
        >
      `,
      root
    );
  };
}
// end::snippet[]
