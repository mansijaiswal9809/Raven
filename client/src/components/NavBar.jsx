import { Container } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { BsSearch } from 'react-icons/bs';
import React from 'react'

const NavBar = () => {
  return (
    <Stack direction="row" justifyContent="space-between" padding={2} marginX={1} sx={{fontSize:"20px", backgroundColor:"white", borderRadius:"10px"}} >
        <Stack direction="row" gap={2}>
        <Box><BsSearch/></Box>
        <Box>Search User</Box>
        </Stack>
        <Box> Raven</Box>
    </Stack>
  )
}

export default NavBar
