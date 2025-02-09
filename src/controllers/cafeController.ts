import { Request, Response } from "express";
import {
  uploadProcessedData,
  getTheData,
  updateDataById,
  deleteDataById,
  getTheDataById,
  getDataByPriceGreaterThan,
} from "../db.js";
import { Data } from "../types.js";

export async function create(req: Request, res: Response) {
    try {
        const {name, price, photo, category} = req.body;

        const data: Data = {
            id: "",
            name,
            photo,
            price,
            category,
        };

        await uploadProcessedData(data);
        res.status(201).json({message: "Блюдо успешно добавлено!"});
    } catch (error) {
        console.error("Ошибка при добавлении блюда:", error);
        res.status(500).json({error:"Ошибка при добавлении блюда"});
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await getTheData();
        res.status(200).json(data);
    } catch (error) {
        console.error("Ошибка при получении информации о блюде с заданным ID: ", error);
        res.status(500).json({error:"Ошибка при получении информации о блюде с заданным ID"});
    }
}

export async function getAll(req: Request, res: Response) {
    try {
        const data = await getTheData();
        res.status(200).json(data);
    }catch (error) {
        console.error("Ошибка при получении информации о блюдах:", error);
        res.status(500).json({error:"Ошибка при получении информации о блюдах"});
    }
}

export async function updateById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {name, price, photo, category} = req.body;

        const updatedData: Data = {
            id,
            name,
            photo,
            price,
            category,
        };

        await updateDataById(id, updatedData);
        res.status(201).json({message: "Блюдо успешно обновлено!"});
    } catch (error) {
        console.error("Ошибка при обновлении блюда:", error);
        res.status(500).json({error:"Ошибка при обновлении блюда"});
    }
}

export async function deleteById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await deleteDataById(id);
        res.status(205).json(data);
    } catch (error) {
        console.error("Ошибка при удалении блюда:", error);
        res.status(500).json({error:"Ошибка при удалении блюда"});
    }
}

export async function getByPrice(req: Request, res: Response) {
    try {
        const { minPrice } = req.query;
        if (!minPrice || isNaN(Number(minPrice))) {
            res.status(400).json({error:"Параметр minPrice обязателен и должен быть числом"});
            return;
        }
    } catch (error) {
        console.error("Ошибка при полчении данных по цене:", error);
        res.status(500).json({error:"Ошибка при получении данных по цене"});
    }
}