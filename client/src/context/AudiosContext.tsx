import { createContext } from "react";
import { AudiosContextType } from "../types/AudiosContextType";
import { audiosContextDefault } from "../consts/audiosContextDefault";

const AudiosContext = createContext<AudiosContextType>(audiosContextDefault);

export default AudiosContext;