'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(trigger: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!trigger.current) return

    gsap.fromTo(
      trigger.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [trigger])
}

export function useCounterAnimation(
  ref: React.RefObject<HTMLElement>,
  endValue: number,
  duration: number = 2
) {
  useEffect(() => {
    if (!ref.current) return

    const text = ref.current.textContent
    const counter = { value: 0 }

    gsap.to(counter, {
      value: endValue,
      duration,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(counter.value).toLocaleString()
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [ref, endValue, duration])
}

export function useInViewAnimation(ref: React.RefObject<HTMLElement>) {
  const inView = useInView(ref)
  return inView
}

export function useSVGPathAnimation(
  svgRef: React.RefObject<SVGPathElement>,
  duration: number = 2
) {
  useEffect(() => {
    if (!svgRef.current) return

    const path = svgRef.current
    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to(path, {
      strokeDashoffset: 0,
      duration,
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [svgRef, duration])
}

export function useParallaxScroll(
  ref: React.RefObject<HTMLElement>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: `${window.innerHeight * speed}px`,
      scrollTrigger: {
        trigger: ref.current,
        scrub: 1,
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [ref, speed])
}

export function useStaggerAnimation(
  containerRef: React.RefObject<HTMLElement>,
  itemSelector: string,
  staggerAmount: number = 0.1
) {
  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll(itemSelector)

    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: staggerAmount,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [containerRef, itemSelector, staggerAmount])
}
