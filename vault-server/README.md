# Agala Server

## Internal API data

Internal API data structure is seperated to two main categories

- `Prices API` - this collection will hold all relevant data from gov's API (chains,branches,product prices)
- `Agala API` - Will hold users, their carts, and additional app metadata like statistics.

### `Prices API`

1. `Chain`

   - id
   - name
   - lastSyncDate
   - subchains: `Subchain[]`

2. `Subchain`

   - id
   - name
   - branches: `Branch[]`

3. `Branch`

   - id
   - name
   - type
   - address
   - city
   - zipcode
   - products: `Product[]`

4. `Product`

   main fields:

   - code
   - name
   - productStatus
   - type
   - priceHistoryLog: `PriceLog[]`

   manufaturer related fields:

   - manufacturerName
   - manufacturerCountry
   - manufacturerProductDescription

   price related fields:

   - price
   - pricePerBaseUnit
   - priceUpdateDate
   - allowDiscount

   quantity related fields:

   - amount
   - amountInPackage
   - unitName
   - baseUnit
   - needsWeighting

5. `PriceLog`
   - id
   - priceUpdateDate
   - price
   - pricePerBaseUnit
   - productStatus

### `Agala API`

1. `User`

   - id
   - fullname
   - registerDate
   - phonenumber
   - activeCart: `Cart`
   - cartsHistory: `Cart[]`

2. `Cart`

   - id
   - chainId
   - subchainId
   - branchId

   - shareId
   - contributers: `User[]`

   - purchasedDate
   - products: `ProductSnapshot[]`

3. `ProductSnapshot`

   - code
   - priceAtPurchaseDate

## Gov API Data

## Shufersal

### scrap strategy:

Link to "api" - https://prices.shufersal.co.il/

Shufersal reveals several data categories:

1. Prices - category value `1`
2. PricesFull - category value `2`
3. Promos - category value `3`
4. PromosFull - category value `4`
5. Stores - category value `5`

Link to retrieve filtered HTML table that contains the download link :
https://prices.shufersal.co.il/FileObject/UpdateCategory?catID=`1`&storeId=`1`

- `catID`: the category id we want to filter by.
- `storeId`: the actual branch id we want to filter by
  for both, setting id as `0` means "all".

Example Link to stores metadata file download:
https://pricesprodpublic.blob.core.windows.net/stores/Stores7290027600007-000-202405170201.gz?sv=2014-02-14&sr=b&sig=7z%2FFmoxzlRo0TlFVNQdwiwydQgzZJjPUjOOMBvZBIZo%3D&se=2024-05-17T15%3A28%3A04Z&sp=r

breakdown:

1. `endpoint` -
   https://pricesprodpublic.blob.core.windows.net/stores/

2. `filename` -
   Stores7290027600007-000-202405170201.gz
   file id - "Stores7290027600007"
   empty branch name due to format - "000"
   update date (YYYY_MM_DD_HH_MM) - 202405170201

3. `url params` -
   &sr=b&sig=7z%2FFmoxzlRo0TlFVNQdwiwydQgzZJjPUjOOMBvZBIZo%3D&se=2024-05-17T15%3A28%3A04Z&sp=r

Because url params is a request signature, to generate one we would need to request
the download link via the main url
"https://prices.shufersal.co.il/FileObject/UpdateCategory?catID=5&storeId=0"
first, and then scrap the retrieved html.

we can point to the exact "download" column using the following generated selector:

`#gridContainer > table > tbody > tr > td:nth-child(1) > a`

to request the HTML, I'm going to use "axio".
to scrap all needed data, I'm going to use the scrapping lib "cheerio".

The downloaded metadata comes in a gzip archive with 1 XML data file.

#### Stores metadata structure:

Retrieved store data structured as:

```xml
<CHAINID>7290027600007</CHAINID>
<STORES>...</STORES>
<LASTUPDATEDATE>2024-05-17</LASTUPDATEDATE>
```

- `CHAINID`: main chain id - 7290027600007
- `LASTUPDATEDATE`: last data update with date format YYYY-MM-DD

The actual branches data structure is:

```xml
<STORE>
    <SUBCHAINID>1</SUBCHAINID>
    <STOREID>1</STOREID>
    <BIKORETNO>7</BIKORETNO>
    <STORETYPE>1</STORETYPE>
    <CHAINNAME>שופרסל</CHAINNAME>
    <SUBCHAINNAME>שופרסל שלי</SUBCHAINNAME>
    <STORENAME>שלי ת"א- בן יהודה</STORENAME>
    <ADDRESS>בן יהודה 79</ADDRESS>
    <CITY>תל אביב</CITY>
    <ZIPCODE>6343504</ZIPCODE>
</STORE>
```

- `SUBCHAINID`: Each main chain can have sub-chains, in our example it could be "Be" or "Shufersal Sheli" etc...
- `STOREID`: This is the actual branch id
- `BIKORETNO`: the data inspection number.
- `STORETYPE`: TODO - what does it mean?
- `CHAINNAME`: the name of the main chain. redundant as we already know it.
- `SUBCHAINNAME`: The subchain name
- `STORENAME`: The actual branch name. <-- This is needed!
- `ADDRESS`: Could be used to show the chains on google maps or detect in which branch the user started shoppoing (branch auto detection)
- `CITY`: Branche's city
- `ZIPCODE`: branch's postal zipcode

#### Products Full price metadata structure:

'PriceFull' category is the data file we want because it contains all branch's prices.

The main prices file metadata:

```xml
<root>
  <ChainId>7290027600007</ChainId>
  <SubChainId>001</SubChainId>
  <StoreId>001</StoreId>
  <BikoretNo>9</BikoretNo>
  <DllVerNo>8.0.1.3</DllVerNo>
  <Items Count="5628"></Items>
</root>
```

- `ChainId`: the main chain Id (of Shufersal itself)
- `SubChainId`: subchain Id (like 'Be' or 'Sheli')
- `StoreId`: the actual branch id. this id is retrieved from the branch metadata part and is used to retrieve this file via the scrapper.
- `BikoretNo`: the data inspection number.
- `DllVerNo`: TODO - find out what this means?
- `Items`: holds the actual products data. contains a field named `Count` which represents how many products there are.

Product's data structure:

```xml
<Item>
      <PriceUpdateDate>2018-08-10 01:18</PriceUpdateDate>
      <ItemCode>11182700954</ItemCode>
      <ItemType>1</ItemType>
      <ItemName>שעועית שחורה 439 גרם</ItemName>
      <ManufacturerName>האנאובר פודס קורפורשיין</ManufacturerName>
      <ManufactureCountry>US</ManufactureCountry>
      <ManufacturerItemDescription>שעועית שחורה439ג</ManufacturerItemDescription>
      <UnitQty>גרמים</UnitQty>
      <Quantity>439.00</Quantity>
      <bIsWeighted>0</bIsWeighted>
      <UnitOfMeasure>100 גרם</UnitOfMeasure>
      <QtyInPackage>1</QtyInPackage>
      <ItemPrice>10.90</ItemPrice>
      <UnitOfMeasurePrice>2.48</UnitOfMeasurePrice>
      <AllowDiscount>1</AllowDiscount>
      <ItemStatus>1</ItemStatus>
</Item>
```

- `PriceUpdateDate`: last price update date - could be used to check whether to sync or pass this product.
- `ItemCode`: product's barcode - this is how we will point to each product via the barcode scanner. <- IMPORTANT
- `ItemType`: TODO - find out what it means?
- `ItemName`: actual product's name <- IMPORTANT
- `ManufacturerName`: manufaturer name
- `ManufactureCountry`: manufacturer country
- `ManufacturerItemDescription`: manufacturer suppplied product description
- `UnitQty`: the name of the unit of measurement
- `Quantity`: the actual quantity/amount <- IMPORTANT
- `bIsWeighted`: is this product needs to be weighted or not? (like veggies, butcher meat etc.)
- `UnitOfMeasure`: amount of measurement to determine 'price per base quantity'
- `QtyInPackage`: quantity of single product in a package (for example, Tuna comes as 4 in a singlepackage.)
- `ItemPrice`: actual product's price. <- IMPORTANT
- `UnitOfMeasurePrice`: 'price per base quantity'
- `AllowDiscount`: a flag to determine whether a discount is allowed.
- `ItemStatus`: TODO - find out what it means? may be active/deactivated product.
