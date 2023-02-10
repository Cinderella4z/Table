export function useTable(options) {
  function registerTable(instance) {
    const { api, apiParams, data, columns, dragable } = options;
    const { setColumns, setBodyData, setDragable } = instance.exposed;
    columns && setColumns(columns);
    data ? setBodyData(data) : setBodyData(api.bind(null, apiParams));
    dragable && setDragable(dragable);
  }
  return {
    registerTable,
  };
}
