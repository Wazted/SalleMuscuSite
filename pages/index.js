import Head from 'next/head'
import { motion } from 'framer-motion'
import { SunIcon,
  MoonIcon,
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon
} from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
  useColorMode,
  Flex,
  Box,
  Spacer,
  Heading,
  Image,
  useColorModeValue,
  Center,
  IconButton
} from "@chakra-ui/react"

const MotionBox = motion(Box)
const MotionWrapItem = motion(WrapItem)
const MotionWrap = motion(Wrap)

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const iconButton = useColorModeValue(<SunIcon />, <MoonIcon />);

  return (
    <div>
      <Head>
        <title>ShowSite Wazted</title>
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
          <Heading size="md">Wazted Show</Heading>
        </MotionBox>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              mr="4"
            />
            <MenuList>
              <MenuItem icon={<AddIcon />} command="⌘T">
                New Tab
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                New Window
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                Open Closed Tab
              </MenuItem>
              <MenuItem icon={<EditIcon />} command="⌘O">
                Open File...
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            onClick={toggleColorMode}
            icon={iconButton}
            aria-label="ColorMode"
          />
        </Box>
      </Flex>
      <Box py="10" size="lg">
        <Center>
        <MotionWrap
          spacing="4"
        >
          <MotionWrapItem
            bg={colorNav}
            onClick={() => window.open("https://wazted.fr/", '_blank').focus()}
            cursor="pointer"
            whileHover={{ scale: 1.05 }}
            initial="rest"
            whileTap={{ scale: 0.95 }}
            w="sm"
            maxH="md"
            rounded="md"
            overflow="hidden"
            boxShadow="lg"
          >
            <Box textAlign="center">
                <Image src="https://wazted.fr/assets/img/wAZZZZ3.png" alt="Waz Logo" />
                <Heading size="md" m="3">Wazted.fr Portfolio</Heading>
            </Box>
          </MotionWrapItem>
          <MotionWrapItem
            bg={colorNav}
            onClick={() => window.open("https://wazted.fr/", '_blank').focus()}
            cursor="pointer"
            whileHover={{ scale: 1.05 }}
            initial="rest"
            whileTap={{ scale: 0.95 }}
            w="sm"
            maxH="md"
            rounded="md"
            overflow="hidden"
            boxShadow="lg"
          >
            <Box textAlign="center">
                <Image src="https://wazted.fr/assets/img/wAZZZZ3.png" alt="Waz Logo" />
                <Heading size="md" m="3">Wazted.fr Portfolio</Heading>
            </Box>
          </MotionWrapItem>
        </MotionWrap>
        </Center>
      </Box>
    </div>
  )
}
