import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Flex, HStack, Image, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Center>
  <Flex sx={{"background": "linear-gradient(180deg, #050303 0%, #2D2E2E 100%) fixed", "height": "100vh"}}>
  <VStack spacing={`4em`} sx={{"fontSize": "2em", "paddingTop": "10%", "height": "100vh", "paddingBottom": "30%"}}>
  <Link as={``} onClick={(_e) => addEvents([Event("_redirect", {path:`/wardrobe`,external:false})], (_e))} sx={{"color": "#FBFBFB", "fontSize": "1em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word", "display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "1em"}}>
  {`Wardrobe`}
</Link>
  <SimpleGrid sx={{"paddingLeft": "8%"}}>
  <HStack>
  <Image src={`box 1.png`} sx={{"width": "30%", "marginTop": "3em"}}/>
  <Image src={`box2.png`} sx={{"width": "30%"}}/>
  <Image src={`box3.png`} sx={{"width": "30%", "marginTop": "3em"}}/>
</HStack>
</SimpleGrid>
  <Text sx={{"color": "#FBFBFB", "fontSize": "2em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word"}}>
  {`Dressify`}
</Text>
  <Button onClick={(_e) => addEvents([Event("state.onclick", {})], (_e))}>
  {`START`}
</Button>
  <Text sx={{"width": "100%", "height": "100%", "color": "#FBFBFB", "fontSize": "1em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
  {`GETTING STARTED`}
</Text>
  <HStack spacing={`2em`} sx={{"paddingBottom": "30%"}}>
  <Box sx={{"width": "100%", "height": "100px", "background": "#BCABAE", "borderRadius": "218.50px"}}>
  <Image src={`icon1.png`} sx={{"width": "100%", "height": "100px", "objectFit": "cover"}}/>
  <Text sx={{"color": "#FBFBFB", "fontSize": "0.5em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word", "textAlign": "center", "paddingTop": "10%"}}>
  {`browse wardrobe`}
</Text>
</Box>
  <Box sx={{"width": "100%", "height": "100px", "background": "#FBFBFB", "borderRadius": "218.50px", "marginRight": "2rem"}}>
  <Image src={`icon2.png`} sx={{"width": "100%", "height": "100px", "objectFit": "cover"}}/>
  <Text sx={{"color": "#FBFBFB", "fontSize": "0.5em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word", "textAlign": "center", "paddingTop": "10%"}}>
  {`filter your selection`}
</Text>
</Box>
  <Box sx={{"width": "100%", "height": "100px", "background": "#716969", "borderRadius": "218.50px"}}>
  <Image src={`icon3.png`} sx={{"width": "100%", "height": "100px", "objectFit": "cover"}}/>
  <Text sx={{"color": "#FBFBFB", "fontSize": "0.5em", "fontFamily": "static/Raleway-Light.ttf", "fontWeight": 400, "wordWrap": "break-word", "textAlign": "center", "paddingTop": "10%"}}>
  {`generate your outfit`}
</Text>
</Box>
</HStack>
</VStack>
</Flex>
</Center>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
