# Вариант 3 (Вариант 5 из бэка)

## Первый этап - прочитать данные из input_data2.csv, обработать их и вывести в несколько csv-файлов с выборками:
1. в названии города 3 и более гласных букв и лишь одно слово
2. взять все строки, сгруппировать их по странам, вычислить сумму населения по их городам и вывести в отдельный файл топ10 стран по сумме населений (колонки: название страны, топовый город, сумма населений)
3. нагуглить широту и долготу нашего офиса. Добавить 2 колонки: lat_from_tgn, lng_from_tgn. Пройтись по всем строкам и добавить в новые 2 колонки разницу между широтой/долготой города и нашим офисом.

    У скрипта должен быть параметр - название исходного csv-файла. Если вводим название несуществующего файла, то выдать ошибку с соответствующим сообщением.

    Дополнительно для каждого варианта вывести txt-файл со строками:
        количество строк в исходном csv-файле
        для каждого выходного файла его название и количество строк в нем
    Выходные файлы должны лежать в директории output, которую нужно создать скриптом.



// Закодить на ФП
    // Отрефакторить ФП, чтобы данные были иммутабельными, функции выполянили Single Responsibility
// Отрефакторить на ООП на прототипах + добавить какую-то задачу на расширение логики
// ??? Плюс сделать чтобы задания из первого таска выполнялись параллельно?

// Отрефакторить на классы

// Вынести свою общую логику в библиотеку, подключить ее, также мб заюзать библиотеку для какой-то логики (например работы с csv)
// добавить DTO
// Заюзать sleep и сделать progress bar
// Заюзать паттерны, и publisher/subscriber
