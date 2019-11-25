<?php

namespace Tars\registry;

use Tars\registry\contract\StoreCacheInterface;

class RouteTable implements StoreCacheInterface
{
    private static $_swooleTable;

    const SWOOLE_TABLE_SET_FAILED = -1001;
    const SWOOLE_TABLE_GET_FAILED = -1002;

    // routeInfo由一个结构体组成
    public function __construct($config = [])
    {
        $size = isset($config['size']) ? $config['size'] : 200;
        //100个服务,每个长度1000 需要100000个字节,这里申请200行,对应200个服务
        self::$_swooleTable = new \swoole_table($size);
        self::$_swooleTable->column('routeInfo', \swoole_table::TYPE_STRING, 1000);
        self::$_swooleTable->column('timestamp', \swoole_table::TYPE_INT, 4);
        self::$_swooleTable->create();
    }
    private function __clone()
    {
    }
    public static function getInstance()
    {
        if (self::$_swooleTable) {
            return self::$_swooleTable;
        } else {
            new self();

            return self::$_swooleTable;
        }
    }

    public static function setRouteInfo($moduleName, $routeInfo)
    {
        $routeInfoStr = \serialize($routeInfo);
        self::getInstance()->set($moduleName,
            ['routeInfo' => $routeInfoStr, 'timestamp' => time()]);
    }

    public static function getRouteInfo($moduleName)
    {
        $result = self::getInstance()->get($moduleName);
        if ($result) {
            $routeInfoStr = $result['routeInfo'];
            $timestamp = $result['timestamp'];
            $routeInfo = \unserialize($routeInfoStr);

            return [
                'routeInfo' => $routeInfo,
                'timestamp' => $timestamp,
            ];
        }
        return [];
    }
}
