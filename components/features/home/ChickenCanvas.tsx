"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface ChickenCanvasProps {
    scrollYProgress: MotionValue<number>;
    imagePath?: string;
    frameCount?: number;
    className?: string; // Allow passing className
}

export function ChickenCanvas({
    scrollYProgress,
    imagePath = "/ezgif-animation-friedchicken-jpg/ezgif-frame-",
    frameCount = 200,
    className,
}: ChickenCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `${imagePath}${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        // Resolve anyway to avoid blocking
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setImagesLoaded(true);
        };

        loadImages();
    }, [frameCount, imagePath]);

    const renderFrame = (progress: number) => {
        if (!canvasRef.current || !imagesLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate frame index
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        const img = images[frameIndex];
        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // "Cover" fit calculation
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth, drawHeight;

        if (canvasAspect > imgAspect) {
            // Canvas is wider relative to height -> fit to width, crop height
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
        } else {
            // Canvas is taller relative to width -> fit to height, crop width
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgAspect;
        }

        const startX = (canvasWidth - drawWidth) / 2;
        const startY = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
    };

    // React to scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        renderFrame(latest);
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const parent = canvas.parentElement;
                if (parent) {
                    // Match parent dimensions
                    canvas.width = parent.clientWidth;
                    canvas.height = parent.clientHeight;
                    // Re-render
                    renderFrame(scrollYProgress.get());
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, scrollYProgress]);

    // Initial draw
    useEffect(() => {
        if (imagesLoaded) {
            renderFrame(scrollYProgress.get());
        }
    }, [imagesLoaded]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                    Loading...
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
