#!/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2021/4/3 1:29
# @Author  : Wang Bohan
# @File    : utils.py
# @Software: IntelliJ IDEA
import json
from typing import Dict, List

from django.http import HttpResponse


class ApiResponse:
    def __init__(self, code: int, message: str, data: Dict or List, **kwargs):
        """
        统一返回的JSON格式
        :param code: 响应码
        :param message: 提示信息
        :param data: 实际数据
        :param kwargs: 冗余数据
        :return:
        """
        body = {
            "code": code,
            "message": message,
            "data": data,
            **kwargs
        }
        resp = HttpResponse()
        resp['Content-Type'] = 'application/json'
        resp.content = json.dumps(body, ensure_ascii=False)
        self.resp = resp

    def __call__(self, *args, **kwargs):
        return self.resp
