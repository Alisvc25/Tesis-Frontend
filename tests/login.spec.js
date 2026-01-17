import { test, expect } from "@playwright/test";

test("Compatibilidad: Login renderiza correctamente", async ({ page }) => {
    await page.goto("/login?role=administrador");

    await expect(page.getByRole("heading", { name: "Iniciar Sesión" })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Iniciar Sesión" })).toBeVisible();
});

test("Responsive móvil: Login se ve bien en pantalla pequeña", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12/13 aprox
    await page.goto("/login?role=administrador");

    await expect(page.getByRole("button", { name: "Iniciar Sesión" })).toBeVisible();
});

test("Responsive tablet: Login se ve bien en pantalla mediana", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
    await page.goto("/login?role=administrador");

    await expect(page.getByRole("button", { name: "Iniciar Sesión" })).toBeVisible();
});
