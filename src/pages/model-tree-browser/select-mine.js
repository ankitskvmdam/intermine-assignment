import { MODEL_TREE_MINES_OPTIONS } from "../../constants/model-tree";
/**
 * @typedef {Object} PropsType
 * @property {string} selectedMine
 * @property {Function} onChangeSelect
 */
/**
 *
 * @param {PropsType} props
 */
export const SelectMine = (props) => {
  const { onChangeSelect, selectedMine } = props;

  return (
      <div className='form-group'>
          <label htmlFor='select-mine'>
              Select Mine
          </label>
        <select id="select-mine" name="select-mine" className="select" value={selectedMine} onChange={onChangeSelect}>
        {MODEL_TREE_MINES_OPTIONS.map((obj) => {
            return (
            <option key={obj.value} value={obj.value}>
                {obj.label}
            </option>
            );
        })}
        </select>
      </div>
  );
};
