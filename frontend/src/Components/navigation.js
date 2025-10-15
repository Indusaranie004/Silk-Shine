import { Box, Flex, Text, Link, Button, Image } from "@chakra-ui/react"
import "../styles/home.css"

export default function Navigation({ showLogout = true }) {
  return (
    <Box
      as="nav"
      className="navigation"
      position="fixed"
      w="full"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg="white"
    >
      <Flex
        align="center"
        justify="space-between"
        px={8}
        py={4}
        maxW="1400px"
        mx="auto"
      >
        {/* Logo and Brand Name */}
        <Flex align="center" gap={3}>
          <Image
            src={require("../assets/images/Logo.png")}
            alt="Beauty Studio Logo"
            w="50px"
            h="50px"
            objectFit="contain"
          />
          <Flex height="50px" alignItems="baseline">
            <Text
              className="logo"
              fontSize="29px"
              fontWeight="normal"
              fontStyle="italic"
              fontFamily="'Brush Script MT', cursive"
              color="black"
              textShadow="1px 1px 0px rgba(0,0,0,0.2)"
              transform="rotate(1deg)"
            >
              Silk&Shine
            </Text>
          </Flex>
        </Flex>

        {/* Navigation Links */}
        <Flex align="center" gap={25}>
          <Link href={showLogout ? "/Home" : "/"}
          className="nav-link"
          >
            Home
          </Link>
          <Link href={showLogout ? "/about" : "/guest-about"}
          className="nav-link"
          >
            About
          </Link>
          <Link
            href={showLogout ? "/services" : "/guest-services"}
            className="nav-link"
          >
            Services
          </Link>
          {/*<Link href="/portfolio" className="nav-link">
            Portfolio
          </Link> */}
          <Link href={showLogout ? "/contact-us" : "/guest-contact-us"} 
          className="nav-link">
            Contact
          </Link>

          {/* Client Profile - only visible when logged in */}
          {showLogout && (
            <Link href="/client-profile" className="nav-link">
              My Profile
            </Link>
          )}
        </Flex>

        {/* Logout Button - Only show when showLogout is true */}
        {showLogout && (
          <Button
            as="a"
            href="/" // Update this path to your actual logout route
            className="nav-cta"
            size="sm"
            bg="black"
            color="white"
            textDecoration="none"
            _hover={{ bg: "#0a0a0ae2", color: "white", textDecoration: "none" }}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  )
}
