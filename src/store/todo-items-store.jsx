import { createContext, useReducer } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
});

function todoItemsReducer(currentTodoItems, action) {
  let newTodoItems = currentTodoItems;
  if (action.type === "NEW_ITEM") {
    newTodoItems = [
      ...currentTodoItems,
      { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
    ];
  } else if (action.type === "DELETE_ITEM") {
    newTodoItems = currentTodoItems.filter(
      (value) => value.name !== action.payload.itemName
    );
  }
  return newTodoItems;
}

function TodoItemsContextProvider({ children }) {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  function onNewItem(itemName, itemDueDate) {
    const newItemAction = {
      type: "NEW_ITEM",
      payload: {
        itemName,
        itemDueDate,
      },
    };
    dispatchTodoItems(newItemAction);
    // setTodoITems((currValue) => [
    //   ...currValue,
    //   { name: itemName, dueDate: itemDueDate },
    // ]);
  }
  function handleDelete(itemName) {
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        itemName,
      },
    };
    dispatchTodoItems(deleteItemAction);
    // const newTodoItems = todoItems.filter((value) => value.name !== itemName);
    // setTodoITems(newTodoItems);
  }

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems: todoItems,
        addNewItem: onNewItem,
        deleteItem: handleDelete,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
}

export default TodoItemsContextProvider;
