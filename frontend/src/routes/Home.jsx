import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Home.css';
import api from "../axios-config";
import { FaRegComment } from "react-icons/fa";

const Home = () => {
  const [memories, setMemories] = useState([]);


  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getMemories = async () => {
      try {
        const res = await api.get("/memories");
        setMemories(res.data);
      } catch (err) {
        console.error("Erro ao buscar memórias:", err);
      }
    };
    getMemories();
  }, []);

  // Calcula a largura total para o dragConstraints
  useEffect(() => {
    if (carousel.current) {
      const scrollWidth = carousel.current.scrollWidth;
      const offsetWidth = carousel.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [memories]);

  return (
    <div className="Home">
      <div className="title-carousel">
        <h2>Create publication</h2>
      </div>

      <motion.div ref={carousel} className='carousel'>
        <motion.div
          className='inner'
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          // dragMomentum={false}
          // dragElastic={0.5}
          dragTransition={{
            power:0.2,
            timeConstant:200
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {memories.length > 0 ? (
            memories.map(memory => (
              <motion.div className='item' key={memory._id}>
                <img src={`${api.defaults.baseURL}/${memory.src}`} alt={memory.title} />
                {/* <p>{memory.title}</p> */}
                <Link to={`/memories/${memory._id}`}><FaRegComment /></Link>
              </motion.div>
            ))
          ) : (
            <p>Nenhuma memória encontrada.</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
