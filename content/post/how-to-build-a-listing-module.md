+++
title = "How to build a reusable listing module"
description = "A step by step guide to build a complete listing's module that can communicate with an API"
tags = ["javascript", "api", "golang", "vuejs"]
date = 2022-01-02
image = "img/1.png"
comment = true
+++

Sometime, it's hard to visualize how to build a process, in this article,
we will see how to build a complete listing's module from scratch.

For illustrate examples, I'm going to use `Golang` and `VueJS`.

## Conventional data format

First, we have to see from the API before seeing from the Front.
We need a good conventional data format that can be used by
listing's module for any object else we go drop in a fall of
verification frontside.

Let's show what a listing's module look like :

![Listing](/images/articles/listing.jpeg)

It is a very basic listing's interface,
we have a header with filter's possibility
and some rows.

I coming back on the front's implementation later, I show you that only
for have a visual representation, so let's focus on the data format !

After all, no one data format is the best, make you're own choice,
I'm just going to present you one way of doing.

## Meta

First good practice, it's to include `meta-data` in you're result.
Why ? We will see this.

### Meta Data Example

```json {linenos=table,hl_lines=["2-14"]}
{
    "meta": {
        "header": {
            "id": {
                "name": "ID",
                "type": "number"
            },
            "first_name": {
                "name": "First Name",
                "type": "string"
            },
            ...
        },
        "nb_line": 23594,
  "body": [ ... ]
}
```

Like you can see, I have added a `meta` object where I store all
information about my request. In this, I have inside an object called
`header`, that contain all my fields with their definition.
For example, if you want add a reference's key system, you can add
a field named `reference` and pass the reference's key in this.

The utility about that, you can use this in you're front for some feature.

For `reference`'s example, you want make an autocomplete module, and you want use it on
`Business`'s field, you're default request is :

### Get User Structure from Database
```sql
SELECT
    user.id,
    user.mail,
    business.name
FROM
    user
LEFT JOIN
    business ON business.business_id = user.business_id
```

Ok, now, on the listing's interface,
you search with autocomplete's feature a business.
You're autocomplete's route give you a data like that :

### Suggestion result format
```json
[
  {
    "plain": "Twitter",
    "value": "Twitter"
  } 
]
```

The modified request will look like :

### Get User Structure from Database with custom query
```sql
SELECT
    user.id,
    user.mail,
    business.name
FROM
    user
LEFT JOIN
    business ON business.business_id = user.business_id
WHERE
    business.name = "Twitter"
```

Clearly, this is not optimize. So `Reference`'s key come to the party,
We will map the `business.name`'s value to the `business.business_id`'s value
and when we will build the request,
`WHERE` condition will used `business.business_id` instead of `business.name`.

I hope you understand the utility to have meta description of you're field.
We will come back to it below, on his implementation.

## Queries

When you use field's filter, you need to say that to you're API, but who ?

Pass condition to you're API can be complicated, more when you want do that
for get data. But we don't have many option, let's see who do that.

First, when we ask data to an API, we use the `GET` flag,
if you have already think about pass data to the body, it's possible,
but it's a very bad practice,
don't do that (you can find explication about that [here](https://tools.ietf.org/html/rfc2616#section-4.3)).

So, what we do ?

We have only one possibility, it's to play with `queries`.

In this article, I will show you a basic example, but you can find more complex
queries system here :
- [RestDB : Querying with the api](https://restdb.io/docs/querying-with-the-api)
- [Moesif : Basic design for query and parameters](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Best-Practices-for-Parameters-and-Query-String-Usage/)


# WIP


Codepen : https://codepen.io/Doplex/pen/mdPxjBO
