// components/posts/PostList.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const posts = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
);
