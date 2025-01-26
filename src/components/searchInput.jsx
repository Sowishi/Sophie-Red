import { TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-[250px]"
    >
      <CiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
      <TextInput
        color="light"
        placeholder="Search for guest"
        className="pl-10 w-full"
        onChange={onChange}
      />
    </motion.div>
  );
};

export default SearchInput;
