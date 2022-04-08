import { gql  } from "@apollo/client";

export const fetchNotes = gql`
  {
    notes {
      id
      title
      description
      created_at
    }
  }
`;

export const createNote = gql`
  mutation Create($title: String, $description: String) {
    insert_notes(objects: {
      title: $title
      description: $description
    }) {
      returning {
        id
        title
        description,
        created_at
      }
    }
  }
`

export const deleteNote = gql`
  mutation DeleteNote($id: Int) {
    delete_notes(where: {id: {_eq: $id}}) {
      returning {
        id
        title
        description
      }
    }
  }
`;