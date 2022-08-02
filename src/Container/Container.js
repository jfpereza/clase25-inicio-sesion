import fs from 'fs';
import _dirname from '../utils.js';
const prodUrl = _dirname + '/files/products.txt';
const cartUrl = _dirname + '/files/cart.txt';
const usersUrl = _dirname + '/files/users.txt';

class Container {
    async registerproduct(product) {
        try {
            let data = await fs.promises.readFile(prodUrl, 'utf-8');
            let products = JSON.parse(data);
            let id = products[products.length - 1].id + 1;
            product.available = false;
            product = Object.assign({ id: id }, product);
            products.push(product)
            try {
                await fs.promises.writeFile(prodUrl, JSON.stringify(products, null, 2));
                return { status: "success", message: "Producto registrado" }
            } catch {
                return { statis: "error", message: "No se pudo registrar el Producto" }
            }
        } catch {
            product.available = false;
            product = Object.assign({ id: 1 }, product)
            try {
                await fs.promises.writeFile(prodUrl, JSON.stringify([product], null, 2));
                return { status: "success", message: "Producto registrado" }
            }
            catch {
                return { status: "error", message: "No se pudo registrar a el Producto" }
            }
        }
    }

    async registercart(cart) {//POST CART
        try {
            let data = await fs.promises.readFile(cartUrl, 'utf-8');
            let carts = JSON.parse(data);
            let id = carts[carts.length - 1].id + 1;
            cart.available = false;
            cart = Object.assign({ id: id }, cart);
            carts.push(cart)
            try {
                await fs.promises.writeFile(cartUrl, JSON.stringify(carts, null, 2));
                return { status: "success", message: "cart registrado" }
            } catch {
                return { statis: "error", message: "No se pudo registrar tu cart" }
            }
        } catch {
            cart.available = false;
            cart = Object.assign({ id: 1 }, cart)
            try {
                await fs.promises.writeFile(cartUrl, JSON.stringify([cart], null, 2));
                return { status: "success", message: "cart registrada" }
            }
            catch {
                return { status: "error", message: "No se pudo registrar tu cart" }
            }
        }
    }
    async registerUser(user) {
        try {
            let data = await fs.promises.readFile('./files/users.txt', 'utf-8');
            let users = JSON.parse(data);
            let id = users[users.length - 1].id + 1;
            user.hasProduct = false;
            user = Object.assign({ id: id }, user);
            users.push(user);
            try {
                await fs.promises.writeFile('./files/users.txt', JSON.stringify(users, null, 2));
                return { status: "success", message: "Usuario registrado" }
            } catch {
                return { statis: "error", message: "No se pudo registrar al usuario" }
            }
        } catch {
            user.hasProduct = false;
            user = Object.assign({ id: 1 }, user)
            try {
                await fs.promises.writeFile('./files/users.txt', JSON.stringify([user], null, 2));
                return { status: "success", message: "Usuario registrado" }
            }
            catch {
                return { status: "error", message: "No se pudo registrar al usuario" }
            }
        }
    }
    // -----------------------------------------------------------//
    async getAllproducts() {
        try {
            let data = await fs.promises.readFile(prodUrl, 'utf-8');
            let products = JSON.parse(data);
            return { status: "success", payload: products }
        } catch {
            return { status: "error", message: "Error al obtener los Productos." }
        }
    }
    async getAllcart() {//GET-CART
        try {
            let data = await fs.promises.readFile(cartUrl, 'utf-8');
            let carts = JSON.parse(data);
            return { status: "success", payload: carts }
        } catch {
            return { status: "error", message: "Error al obtener tu cart." }
        }
    }
    async getAllUsers() {
        try {
            let data = await fs.promises.readFile(usersUrl, 'utf-8');
            let users = JSON.parse(data);
            return { status: "success", payload: users }
        } catch {
            return { status: "error", message: "Error al obtener los usuarios." }
        }
    }
    async getproductById(id) {
        try {
            let data = await fs.promises.readFile(prodUrl, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(v => v.id === id)
            if (product) {
                return { status: "success", payload: product }
            } else {
                return { status: "error", message: "Producto no encontrado" }
            }
        } catch {
            return { status: "error", message: "Error al obtener el Producto" }
        }
    }
    // -----------------------------------------------------------//
    async getcartById(id) {//GET-CART
        try {
            let data = await fs.promises.readFile(cartUrl, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(v => v.id === id)
            if (cart) {
                return { status: "success", payload: cart }
            } else {
                return { status: "error", message: "cart no encontrado" }
            }
        } catch {
            return { status: "error", message: "Error al obtener tu cart" }
        }
    }
    async getUserById(id) {
        try {
            let data = await fs.promises.readFile('./files/users.txt', 'utf-8');
            let users = JSON.parse(data);
            let user = users.find(v => v.id === id)
            if (user) {
                return { status: "success", payload: user }
            } else {
                return { status: "error", message: "Usuario no encontrado" }
            }
        } catch {
            return { status: "error", message: "Error al obtener al usuario" }
        }
    }
    async getAproduct(uid, pid) {
        try {
            let productData = await fs.promises.readFile(prodUrl, 'utf-8');
            let userData = await fs.promises.readFile('./files/users.txt', 'utf-8');
            let products = JSON.parse(productData);
            let users = JSON.parse(userData);
            let product = products.find(v => v.id === pid);
            let user = users.find(v => v.id === uid);
            if (!product) return { status: "error", message: "No se encontró el Producto" };
            if (!user) return { status: "error", message: "Usuario no encontrado" };
            if (product.available) return { status: "error", message: "el Producto ya esta en uso " };
            if (user.hasProduct) return { status: "error", message: "Un usuario ya tiene este Producto asignado" };
            product.available = true;
            user.hasProduct = true;
            product.owner = user.id;
            user.product = product.id;
            let userAux = users.map(us => {
                if (us.id === user.id) {
                    return user;
                } else {
                    return us
                }
            })
            let productAux = products.map(pt => {
                if (pt.id === product.id) {
                    return product;
                } else {
                    return pt
                }
            })
            await fs.promises.writeFile(prodUrl, JSON.stringify(productAux, null, 2));
            await fs.promises.writeFile('./files/users.txt', JSON.stringify(userAux, null, 2));
            return { status: "success", message: "¡Producto optenido!" }
        } catch (error) {
            return { status: "error", message: "No se pudo completar el proceso de optener producto: " + error }
        }
    }
    // -----------------------------------------------------------//
    async updateUser(id, body) {
        try {
            let data = await fs.promises.readFile('./files/users.txt', 'utf-8');
            let users = JSON.parse(data);
            if (!users.some(user => user.id === id)) return { status: "error", message: "No hay ningún usuario con el id especificado" }
            let result = users.map(user => {
                if (user.id === id) {
                    if (user.hasProduct) {
                        body = Object.assign(body, { hasProduct: true, product: user.product })
                        body = Object.assign({ id: user.id, ...body })
                        return body
                    }
                    else {
                        body = Object.assign(body, { hasProduct: false })
                        body = Object.assign({ id: user.id, ...body })
                        return body;
                    }
                } else {
                    return user;
                }
            })
            try {
                await fs.promises.writeFile('./files/users.txt', JSON.stringify(result, null, 2));
                return { status: "success", message: "Usuario actualizado" }
            } catch {
                return { status: "error", message: "Error al actualizar el usuario" }
            }
        } catch {
            return { status: "error", message: "Fallo al actualizar el usuario" }
        }
    }
    async updateproduct(id, body) {
        try {
            let data = await fs.promises.readFile(prodUrl, 'utf-8');
            let products = JSON.parse(data);
            if (!products.some(pt => pt.id === id)) return { status: "error", message: "No hay Productos con el id especificado" }
            let result = products.map(product => {
                if (product.id === id) {
                    if (product.available) {
                        body = Object.assign(body, { available: true, owner: product.owner })
                        body = Object.assign({ id: product.id, ...body });
                        return body;
                    }
                    else {
                        body = Object.assign(body, { available: false })
                        body = Object.assign({ id: id, ...body })
                        return body;
                    }
                } else {
                    return product;
                }
            })
            try {
                await fs.promises.writeFile(prodUrl, JSON.stringify(result, null, 2));
                return { status: "success", message: "Producto actualizada" }
            } catch {
                return { status: "error", message: "Error al actualizar el Producto" }
            }
        } catch (error) {
            return { status: "error", message: "Fallo al actualizar el Producto: " + error }
        }
    }
    async updatecart(id, body) {//PUT CART
        try {
            let data = await fs.promises.readFile(cartUrl, 'utf-8');
            let carts = JSON.parse(data);
            if (!carts.some(pt => pt.id === id)) return { status: "error", message: "No hay cart con el id especificado" }
            let result = carts.map(cart => {
                if (cart.id === id) {
                    if (cart.available) {
                        body = Object.assign(body, { available: true, owner: cart.owner })
                        body = Object.assign({ id: cart.id, ...body });
                        return body;
                    }
                    else {
                        body = Object.assign(body, { available: false })
                        body = Object.assign({ id: id, ...body })
                        return body;
                    }
                } else {
                    return cart;
                }
            })
            try {
                await fs.promises.writeFile(cartUrl, JSON.stringify(result, null, 2));
                return { status: "success", message: "cart actualizada" }
            } catch {
                return { status: "error", message: "Error al actualizar carts" }
            }
        } catch (error) {
            return { status: "error", message: "Fallo al actualizar carts: " + error }
        }
    }
    // ----------------------------------------------------------//
    async deleteproduct(id) {
        try {
            let data = await fs.promises.readFile(prodUrl, 'utf-8');
            let products = JSON.parse(data);
            if (!products.some(product => product.id === id)) return { status: "error", message: "No hay Producto con el id especificado" }
            let product = products.find(v => v.id === id);
            if (product.available) {
                try {
                    let userData = await fs.promises.readFile('./files/users.txt', 'utf-8');
                    let users = JSON.parse(userData);
                    users.forEach(user => {
                        if (user.product === id) {
                            user.hasProduct = false;
                            delete user['product']
                        }
                    })
                    await fs.promises.writeFile('./files/users.txt', JSON.stringify(users, null, 2));
                } catch (error) {
                    return { status: "error", message: "Fallo al eliminar el Producto: " + error }
                }
            }
            let aux = products.filter(product => product.id !== id);
            try {
                await fs.promises.writeFile(prodUrl, JSON.stringify(aux, null, 2));
                return { status: "success", message: "Producto eliminado" }
            } catch {
                return { status: "error", message: "No se pudo eliminar el Producto" }
            }
        } catch {
            return { status: "error", message: "Fallo al eliminar el Producto" }
        }
    }
    async deletecart(id) {//DELETE CART
        try {
            let data = await fs.promises.readFile(cartUrl, 'utf-8');
            let carts = JSON.parse(data);
            if (!carts.some(cart => cart.id === id)) return { status: "error", message: "No hay cart con el id especificado" }
            let cart = carts.find(v => v.id === id);
            if (cart.available) {
                try {
                    let userData = await fs.promises.readFile('./files/users.txt', 'utf-8');
                    let users = JSON.parse(userData);
                    users.forEach(user => {
                        if (user.cart === id) {
                            user.hascart = false;
                            delete user['cart']
                        }
                    })
                    await fs.promises.writeFile('./files/users.txt', JSON.stringify(users, null, 2));
                } catch (error) {
                    return { status: "error", message: "Fallo al eliminar el carts: " + error }
                }
            }
            let aux = carts.filter(cart => cart.id !== id);
            try {
                await fs.promises.writeFile(cartUrl, JSON.stringify(aux, null, 2));
                return { status: "success", message: "cart eliminado" }
            } catch {
                return { status: "error", message: "No se pudo eliminar carts" }
            }
        } catch {
            return { status: "error", message: "Fallo al eliminar cart" }
        }
    }
    async deleteUser(id) {
        try {
            let data = await fs.promises.readFile('./files/users.txt', 'utf-8');
            let users = JSON.parse(data);
            if (!users.some(us => us.id === id)) return { status: "error", message: "No hay ningún usuario con el id proporcionado" }
            let user = users.find(us => us.id === id);
            if (user.hasProduct) {
                try {
                    let productData = await fs.promises.readFile(prodUrl, 'utf-8');
                    let products = JSON.parse(productData);
                    products.forEach(product => {
                        if (product.owner === id) {
                            product.available = false;
                            delete product['owner']
                        }
                    })
                    await fs.promises.writeFile(prodUrl, JSON.stringify(products, null, 2));
                } catch {
                    return { status: "error", message: "fallo al eliminar el usuario" }
                }
            }
            let aux = users.filter(user => user.id !== id);
            try {
                await fs.promises.writeFile('./files/users.txt', JSON.stringify(aux, null, 2));
                return { status: "success", message: "Usuario eliminado" }
            } catch {
                return { status: "error", message: "No se pudo eliminar el Producto" }
            }
        }
        catch {
            return { status: "error", message: "Fallo al eliminar el usuario" }
        }
    }
}

export default Container;