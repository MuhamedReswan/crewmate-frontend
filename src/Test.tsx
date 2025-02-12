import { useState } from "react";
import OtpModal from "./components/common/Modal/OtpModal"

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
    <h1>dfsadf</h1>
<OtpModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> 
    </>
 )
}

export default Test
