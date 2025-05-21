import { Select } from "antd";

const { Option } = Select;

const StreamingFilter = ({ onChange }) => {
  return (
    <Select defaultValue="Todas" onChange={onChange} className="bg-gray-800 text-white w-full p-2 rounded-lg shadow-md">
      <Option value="Todas">Todas</Option>
      <Option value="Netflix">Netflix</Option>
      <Option value="HBO">HBO</Option>
      <Option value="Disney+">Disney+</Option>
      <Option value="Amazon Prime">Amazon Prime</Option>
    </Select>
  );
};

export default StreamingFilter;
