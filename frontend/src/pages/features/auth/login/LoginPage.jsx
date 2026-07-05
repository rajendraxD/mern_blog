import { GalleryVerticalEnd, Quote } from "lucide-react"

import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Blog App.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-muted lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-6 px-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary shadow-sm">
            <Quote className="size-7 text-primary-foreground" />
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg leading-relaxed text-foreground/90">
              &ldquo;This blog platform transformed how I share my ideas with the world. The writing experience is pure delight.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">Alex Rivera</strong>
              <br />
              Software Engineer &middot; 15K+ readers
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
