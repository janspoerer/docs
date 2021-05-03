package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("context-menu-left-click")
public class ContextMenuLeftClick extends Div {

  private List<Person> people = DataService.getPeople(5);

  public ContextMenuLeftClick() {
    Grid<Person> grid = new Grid();
    grid.setHeightByRows(true);
    grid.setItems(people);

    grid.addColumn(person -> person.getFirstName())
        .setHeader("First name");
    grid.addColumn(person -> person.getLastName())
        .setHeader("Last name");
    grid.addColumn(person -> person.getEmail())
        .setHeader("Email");
    grid.addColumn(person -> person.getAddress().getPhone())
        .setHeader("Phone number");

    // tag::snippet[]
    GridContextMenu<Person> menu = grid.addContextMenu();
    menu.setOpenOnClick(true);
    menu.addItem("View", event -> {});
    menu.addItem("Edit", event -> {});
    menu.addItem("Delete", event -> {});
    // end::snippet[]

    add(grid);
  }
  public static class Exporter extends DemoExporter<ContextMenuLeftClick> {} // hidden-full-source-line
}
