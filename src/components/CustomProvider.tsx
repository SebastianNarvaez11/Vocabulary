import { FC, ReactNode, useEffect } from "react"
import { useRouter } from "next/router"
import { useAppDispatch } from "../store/hooks"
import { getCurrentUser } from "../store/thunks"
import Cookies from "js-cookie"

interface Props {
  children: ReactNode
}


export const CustomProvider: FC<Props> = ({ children }) => {

  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) dispatch(getCurrentUser(router))
  }, [])

  return (
    <>
      {children}
    </>
  )
}
