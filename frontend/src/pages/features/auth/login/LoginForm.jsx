import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../../store/slices/authSlice"

export function LoginForm() {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "rajendraxd1@gmail.com",
        password: "Admin@123",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await dispatch(login(formData)).unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const handleOnChange = (e) => {
        e.preventDefault()
        let { name, value } = e.target
        if (name === 'email') {
            value = value.toLowerCase()
        }
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary shadow-xs">
                        <LogIn className="size-5 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        disabled={isLoading}
                    />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                            tabIndex={-1}
                        >
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pr-8"
                            autoComplete="current-password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            disabled={isLoading}
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </Button>
                    </div>
                </Field>
                <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in\u2026" : "Sign in"}
                    </Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button variant="outline" type="button" className="w-full">
                        <FcGoogle className="mr-2 size-5" />
                        Google
                    </Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="font-medium underline underline-offset-4">
                            Sign up
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
