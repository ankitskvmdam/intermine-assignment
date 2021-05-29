/**
 * @typedef {Object} SelectOptionUnitType
 * @property {string} value
 * @property {string} label
 */
/**
 * @typedef {Object} PropsType
 * @property {string} selected
 * @property {string} label
 * @property {Array<SelectOptionUnitType>} options
 * @property {Function} onChange
 * 
 */

/**
 *
 * @param {PropsType} props
 */
export const Select = (props) => {
  const { onChange, selected, options, label } = props;

  return (
      <div className='form-group'>
          <label>
              {label}
          </label>
        <select className="select" value={selected} onChange={onChange}>
        {options.map((obj) => {
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
