import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { SunIcon,
  MoonIcon,
  LockIcon,
  UnlockIcon,
} from '@chakra-ui/icons'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Wrap,
  WrapItem,
  useColorMode,
  Flex,
  Box,
  Spacer,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  Input,
  IconButton,
  useBoolean,
  useToast
} from "@chakra-ui/react"

const MotionBox = motion(Box)

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const [isTimer, setIsTimer] = useBoolean();
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(0);
  const [sliderValue, setSliderValue] = useState(30);
  const [secretValue, setSecretValue] = useState("");
  const toast = useToast();
  const [sercretVerif, setSecretVerif] = useBoolean();
  const iconButton = useColorModeValue(<SunIcon />, <MoonIcon />);

  useEffect(() => {
    const interval = setInterval(getTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  function startTimer() {
    if (isTimer) {
      setTimerInterval(setInterval(countDown, 1000));
    }
  }

  function countDown() {
    // Remove one second, set state so a re-render happens.
   setTimer(timer - 1);
    // Check if we're at zero.
    if (timer === 0) {
      setIsTimer.off();
      clearInterval(timerInterval);
      setSliderValue(30);
    }
  }

  function sendNewTimer() {
    const body = {"key": secretValue, "timestamp": sliderValue}
    axios.post('/api/secure', body)
      .then(response => console.log(response))
      .catch(err => toast({
        title: 'Mauvais code..',
        status: 'error',
        duration: 9000,
        isClosable: true,
      }));
  }

  function getTimer() {
    axios.get('/api/secure')
      .then(response => {setIsTimer.on(); setTimer(response.data.value); startTimer()})
      .catch(err => setIsTimer.off());
  }

  return (
    <div>
      <Head>
        <title>Salle Muscu Wazted</title>
        <meta name="description" content="Next.js Chakra Framer Motion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex p="2" bg={colorNav}>
        <MotionBox
          p="2" bg={colorNav}
          whileHover={{ scale: 1.1 }}
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
        >
          <Heading size="md">Muscu timer sommet</Heading>
        </MotionBox>
        <Spacer />
        <Box>
          <IconButton
            onClick={toggleColorMode}
            icon={iconButton}
            aria-label="ColorMode"
          />
        </Box>
      </Flex>
      <Flex py="10" size="lg" direction="column" align={"center"} justify={"center"} px={6}>
          <Text fontSize={"3xl"} textAlign={"center"}>{"Site ayant pour but d'éviter d'aller à la salle de sport si celle-ci est deja occupée."}</Text>
          {isTimer ?
            <Flex bg={colorNav} w="100%" m={10} p={5} align={"center"} justify={"center"} direction={"column"} h="300px">
              <Text fontSize='2xl' fontWeight="bold">
                {~~(timer / 3600)< 10 && "0"}{~~(timer / 3600)}
                :
                {~~(timer / 60) % 60< 10 && "0"}{~~(timer / 60) % 60}
                :
                {timer % 60 < 10 && "0"}{timer % 60}</Text>
              <InputGroup mt={14} direction={"row"} w={"100%"} size="lg">
                <Input placeholder='Code pour enlever le timer'onChange={(e) => setSecretValue(e.target.value)} pr="4.5rm"/>
                <InputRightElement>
                  <IconButton size='md' icon={<UnlockIcon />} onClick={() => sendNewTimer()}/>
                </InputRightElement>
              </InputGroup>
            </Flex>
          :
            <Flex bg={colorNav} w="100%" m={10} p={5} align={"center"} justify={"center"} direction={"column"} h="300px">
              <Text fontSize='2xl' borderBottom="1px" fontWeight="bold">La salle est libre, indique combiens de temps tu seras dedans.</Text>
              <Text fontSize='2xl' mt={2} fontWeight="bold">{~~(sliderValue / 60)}h{sliderValue % 60 < 10 && "0"}{sliderValue % 60}</Text>
              <Slider mt={4} aria-label='slider-ex-1' min={1} max={120} defaultValue={sliderValue} onChange={(val) => setSliderValue(val)}>
                <SliderMark value={60} mt='3' ml='-2.5' fontSize='lg'>
                  1h
                </SliderMark>
                <SliderMark value={120} mt='3' ml='-2.5' fontSize='lg'>
                  2h
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <InputGroup mt={14} direction={"row"} w={"100%"} size="lg">
                <Input isInvalid={sercretVerif} placeholder='Code pour securiser le timer'onChange={(e) => {if (e.target.value !== ""){setSecretVerif.off();} setSecretValue(e.target.value);}} pr="4.5rm"/>
                <InputRightElement>
                  <IconButton size='md' icon={<LockIcon />} onClick={() => {
                      if (secretValue === "") {
                        setSecretVerif.on();
                      } else {
                        setSecretVerif.off();
                        sendNewTimer();
                      }
                    }}/>
                </InputRightElement>
              </InputGroup>
            </Flex>
          }
      </Flex>
    </div>
  )
}
